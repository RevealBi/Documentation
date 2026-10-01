import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, '..', '..');
const DEFAULT_SBOM_ROOT = path.join(REPOSITORY_ROOT, 'static', 'sbom', 'files');
const DEFAULT_ASSESSMENTS = path.join(SCRIPT_DIRECTORY, 'vex-assessments.json');
const MANAGED_PROPERTY = 'reveal:vex:managed';

function parseArguments(argv) {
  const result = {
    assessments: DEFAULT_ASSESSMENTS,
    sbomRoot: DEFAULT_SBOM_ROOT,
    scan: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!['--assessments', '--sbom-root', '--scan'].includes(argument)) {
      throw new Error(`Unknown argument '${argument}'.`);
    }

    const value = argv[index + 1];
    if (!value) {
      throw new Error(`Argument '${argument}' requires a value.`);
    }
    index += 1;

    if (argument === '--assessments') result.assessments = path.resolve(value);
    if (argument === '--sbom-root') result.sbomRoot = path.resolve(value);
    if (argument === '--scan') result.scan = path.resolve(value);
  }

  if (!result.scan) {
    throw new Error('Usage: node scripts/sbom/apply-vex.mjs --scan <osv-scanner-results.json>');
  }

  return result;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function listSboms(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSboms(entryPath);
    return entry.isFile() && entry.name.endsWith('.cdx.json') ? [entryPath] : [];
  });
}

function normalizeFilePath(filePath) {
  return path.resolve(filePath).replaceAll('\\', '/').toLowerCase();
}

function decisionKey(ecosystem, packageName, version, advisory) {
  return [ecosystem, packageName, version, advisory]
    .map(value => String(value).toLowerCase())
    .join('|');
}

function componentMatches(component, packageData) {
  const packageName = packageData.name.toLowerCase();
  const componentName = String(component.name ?? '').toLowerCase();
  const purl = String(component.purl ?? '').toLowerCase();

  return String(component.version ?? '') === packageData.version
    && (componentName === packageName || purl.includes(`/${packageName}@`));
}

function findComponentReferences(document, packageData) {
  const components = [document.metadata?.component, ...(document.components ?? [])].filter(Boolean);
  const references = components
    .filter(component => componentMatches(component, packageData))
    .map(component => component['bom-ref'])
    .filter(Boolean);

  return [...new Set(references)];
}

function vulnerabilitySource(id) {
  return {
    name: 'OSV',
    url: `https://osv.dev/vulnerability/${encodeURIComponent(id)}`,
  };
}

function aliasReference(alias) {
  if (alias.startsWith('CVE-')) {
    return {
      id: alias,
      source: {
        name: 'CVE',
        url: `https://www.cve.org/CVERecord?id=${encodeURIComponent(alias)}`,
      },
    };
  }

  if (alias.startsWith('GHSA-')) {
    return {
      id: alias,
      source: {
        name: 'GitHub Advisory Database',
        url: `https://github.com/advisories/${encodeURIComponent(alias)}`,
      },
    };
  }

  return null;
}

function buildVulnerability(vulnerability, decision, componentReferences, assessment) {
  const aliases = (vulnerability.aliases ?? [])
    .map(aliasReference)
    .filter(Boolean);
  const cwes = (vulnerability.database_specific?.cwe_ids ?? [])
    .map(value => Number.parseInt(value.replace('CWE-', ''), 10))
    .filter(Number.isInteger);
  const advisories = [...new Set((vulnerability.references ?? [])
    .map(reference => reference.url)
    .filter(url => /^https:\/\//.test(url)))]
    .map(url => ({ url }));
  const firstComponentReference = componentReferences[0];
  const analysis = {
    ...decision.analysis,
    firstIssued: assessment.date,
    lastUpdated: assessment.date,
  };

  return {
    'bom-ref': `vex:${vulnerability.id}:${firstComponentReference}`,
    id: vulnerability.id,
    source: vulnerabilitySource(vulnerability.id),
    ...(aliases.length > 0 ? { references: aliases } : {}),
    ...(cwes.length > 0 ? { cwes } : {}),
    description: vulnerability.summary,
    ...(decision.recommendation ? { recommendation: decision.recommendation } : {}),
    ...(advisories.length > 0 ? { advisories } : {}),
    ...(vulnerability.published ? { published: vulnerability.published } : {}),
    ...(vulnerability.modified ? { updated: vulnerability.modified } : {}),
    analysis,
    affects: componentReferences.map(reference => ({ ref: reference })),
    properties: [
      { name: MANAGED_PROPERTY, value: 'true' },
      { name: 'reveal:vex:scanner', value: `${assessment.scanner.name} ${assessment.scanner.version}` },
      { name: 'reveal:vex:database-snapshot', value: assessment.scanner.databaseSnapshot },
    ],
  };
}

function assessmentProperties(assessment, result, findingCount) {
  return [
    { name: 'reveal:vex:assessment-date', value: assessment.date },
    { name: 'reveal:vex:assessment-owner', value: assessment.organization },
    { name: 'reveal:vex:assessment-scope', value: assessment.scope },
    { name: 'reveal:vex:assessment-method', value: assessment.method },
    { name: 'reveal:vex:scanner', value: `${assessment.scanner.name} ${assessment.scanner.version}` },
    { name: 'reveal:vex:scanner-mode', value: assessment.scanner.mode },
    { name: 'reveal:vex:database-snapshot', value: assessment.scanner.databaseSnapshot },
    { name: 'reveal:vex:result', value: result },
    { name: 'reveal:vex:statement-count', value: String(findingCount) },
  ];
}

function validateAssessmentConfiguration(configuration) {
  if (configuration.schemaVersion !== 1) {
    throw new Error(`Unsupported assessment schema version '${configuration.schemaVersion}'.`);
  }

  const keys = new Set();
  for (const decision of configuration.decisions) {
    const key = decisionKey(decision.ecosystem, decision.package, decision.version, decision.advisory);
    if (keys.has(key)) throw new Error(`Duplicate assessment decision '${key}'.`);
    keys.add(key);

    if (decision.analysis.state === 'not_affected' && !decision.analysis.justification) {
      throw new Error(`Not-affected decision '${key}' requires a justification.`);
    }
    if (decision.analysis.state === 'exploitable' && !(decision.analysis.response?.length > 0)) {
      throw new Error(`Exploitable decision '${key}' requires a response.`);
    }
    if (!decision.analysis.detail) {
      throw new Error(`Decision '${key}' requires assessment detail.`);
    }
  }
}

const arguments_ = parseArguments(process.argv.slice(2));
const configuration = readJson(arguments_.assessments);
const scan = readJson(arguments_.scan);
validateAssessmentConfiguration(configuration);

const decisions = new Map(configuration.decisions.map(decision => [
  decisionKey(decision.ecosystem, decision.package, decision.version, decision.advisory),
  decision,
]));
const usedDecisions = new Set();
const scanResults = new Map((scan.results ?? []).map(result => [normalizeFilePath(result.source.path), result]));
const summaries = [];

for (const sbomPath of listSboms(arguments_.sbomRoot).sort()) {
  const document = readJson(sbomPath);
  const scanResult = scanResults.get(normalizeFilePath(sbomPath));
  const managedVulnerabilities = [];

  for (const packageResult of scanResult?.packages ?? []) {
    for (const vulnerability of packageResult.vulnerabilities ?? []) {
      const key = decisionKey(
        packageResult.package.ecosystem,
        packageResult.package.name,
        packageResult.package.version,
        vulnerability.id,
      );
      const decision = decisions.get(key);
      if (!decision) throw new Error(`No VEX assessment exists for '${key}' in '${sbomPath}'.`);
      usedDecisions.add(key);

      const componentReferences = findComponentReferences(document, packageResult.package);
      if (componentReferences.length === 0) {
        throw new Error(`Cannot find a component reference for '${key}' in '${sbomPath}'.`);
      }

      managedVulnerabilities.push(buildVulnerability(
        vulnerability,
        decision,
        componentReferences,
        configuration.assessment,
      ));
    }
  }

  managedVulnerabilities.sort((left, right) => left.id.localeCompare(right.id));
  const existingVulnerabilities = (document.vulnerabilities ?? []).filter(vulnerability =>
    !(vulnerability.properties ?? []).some(property =>
      property.name === MANAGED_PROPERTY && property.value === 'true'));
  const allVulnerabilities = [...existingVulnerabilities, ...managedVulnerabilities];
  if (allVulnerabilities.length > 0) document.vulnerabilities = allVulnerabilities;
  else delete document.vulnerabilities;

  document.version = Math.max(Number(document.version ?? 1), 2);
  document.metadata ??= {};
  document.metadata.timestamp = configuration.assessment.date;
  document.metadata.manufacturer ??= { name: configuration.assessment.organization };
  const preservedProperties = (document.metadata.properties ?? [])
    .filter(property => !property.name.startsWith('reveal:vex:'));
  const result = managedVulnerabilities.length > 0
    ? 'vex_statements_included'
    : 'no_known_vulnerabilities_detected';
  document.metadata.properties = [
    ...preservedProperties,
    ...assessmentProperties(configuration.assessment, result, managedVulnerabilities.length),
  ];

  writeJson(sbomPath, document);
  summaries.push({
    file: path.relative(REPOSITORY_ROOT, sbomPath).replaceAll('\\', '/'),
    statements: managedVulnerabilities.length,
    exploitable: managedVulnerabilities.filter(item => item.analysis.state === 'exploitable').length,
  });
}

const unusedDecisions = [...decisions.keys()].filter(key => !usedDecisions.has(key));
if (unusedDecisions.length > 0) {
  throw new Error(`Assessment decisions were not used by the scan:\n${unusedDecisions.join('\n')}`);
}

const totalStatements = summaries.reduce((total, summary) => total + summary.statements, 0);
const exploitableStatements = summaries.reduce((total, summary) => total + summary.exploitable, 0);
console.log(JSON.stringify({
  documents: summaries.length,
  documentsWithStatements: summaries.filter(summary => summary.statements > 0).length,
  statements: totalStatements,
  exploitableStatements,
  summaries,
}, null, 2));
