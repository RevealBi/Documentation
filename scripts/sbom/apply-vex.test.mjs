import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('./apply-vex.mjs', import.meta.url));

for (const qualified of [true, false]) {
  test(`Maven findings match ${qualified ? 'qualified coordinates without crossing namespaces' : 'legacy artifact names'}`, () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'reveal-vex-'));
    const sbomPath = path.join(directory, 'test.cdx.json');
    const packageName = qualified ? 'org.example:library' : 'library';
    const component = group => ({
      type: 'library', group, name: 'library', version: '1.0.0',
      'bom-ref': `${group}:library`, purl: `pkg:maven/${group}/library@1.0.0?type=jar`,
    });
    const write = (name, value) => fs.writeFileSync(path.join(directory, name), JSON.stringify(value));
    try {
      write('test.cdx.json', {
        bomFormat: 'CycloneDX', specVersion: '1.7', version: 1,
        metadata: {}, components: [component('org.example'), ...(qualified ? [component('org.other')] : [])],
      });
      write('scan.json', { results: [{ source: { path: sbomPath }, packages: [{
        package: { ecosystem: 'Maven', name: packageName, version: '1.0.0' },
        vulnerabilities: [{ id: 'GHSA-test', summary: 'Fixture advisory' }],
      }] }] });
      write('assessments.json', {
        schemaVersion: 1,
        assessment: { date: '2026-11-13T00:00:00Z', organization: 'Test', scope: 'Fixture', method: 'Fixture', scanner: { name: 'Test', version: '1', mode: 'offline', databaseSnapshot: '2026-11-13' } },
        decisions: [{ ecosystem: 'Maven', package: packageName, version: '1.0.0', advisory: 'GHSA-test', analysis: { state: 'in_triage', detail: 'Fixture' } }],
      });
      const result = spawnSync(process.execPath, [script, '--scan', path.join(directory, 'scan.json'), '--assessments', path.join(directory, 'assessments.json'), '--sbom-root', directory], { encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      assert.deepEqual(JSON.parse(fs.readFileSync(sbomPath, 'utf8')).vulnerabilities[0].affects, [{ ref: 'org.example:library' }]);
    } finally {
      const resolved = fs.realpathSync(directory);
      assert.equal(path.dirname(resolved).toLowerCase(), fs.realpathSync(os.tmpdir()).toLowerCase());
      assert.ok(path.basename(resolved).startsWith('reveal-vex-'));
      fs.rmSync(resolved, { recursive: true });
    }
  });
}
