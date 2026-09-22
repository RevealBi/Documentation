import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import TrustCenterLayout from '@site/src/components/TrustCenterLayout';
import styles from './styles.module.css';

type FeatureCardProps = {
  children: ReactNode;
  icon: 'data' | 'deployment' | 'identity' | 'supply-chain';
  title: string;
};

function FeatureIcon({name}: {name: FeatureCardProps['icon']}): React.JSX.Element {
  if (name === 'deployment') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7.5 12 3l8 4.5-8 4.5z" />
        <path d="m4 12 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" />
      </svg>
    );
  }

  if (name === 'identity') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 20c.5-4 2.7-6 6.5-6s6 2 6.5 6" />
        <path d="m17 8 1.3 1.3L21 6.6" />
      </svg>
    );
  }

  if (name === 'supply-chain') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 3h10l4 4v14H5z" />
        <path d="M15 3v5h4M8 12h8M8 16h8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="7" ry="3" />
      <path d="M5 5.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6M5 11.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function FeatureCard({children, icon, title}: FeatureCardProps): React.JSX.Element {
  return (
    <article className={styles.featureCard}>
      <span className={styles.featureIcon}>
        <FeatureIcon name={icon} />
      </span>
      <h2>{title}</h2>
      <p>{children}</p>
    </article>
  );
}

export default function SecurityOverview(): React.JSX.Element {
  return (
    <TrustCenterLayout
      activePage="security"
      title="Security"
      description="Understand the Reveal SDK security model, shared responsibilities, deployment guidance, and vulnerability reporting process.">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <span>Trust Center</span>
        <span aria-hidden="true">/</span>
        <span>Security</span>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Security at Reveal</p>
        <h1>Embedded analytics that stays inside your security boundary</h1>
        <p className={styles.lead}>
          Reveal is an SDK that runs as part of your application and infrastructure. Your
          application remains the source of truth for identity, authorization, tenant context,
          data-source access, and operational controls.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} to="/trust/sbom/">
            View software bills of materials
          </Link>
          <a
            className={styles.secondaryAction}
            href="mailto:support@revealbi.io?subject=Security%20Vulnerability%20Report">
            Report a vulnerability privately
          </a>
        </div>
      </header>

      <section className={styles.featureGrid} aria-label="Reveal security principles">
        <FeatureCard icon="deployment" title="Deployment control">
          Deploy Reveal in your cloud, private cloud, or on-premises environment. The SDK
          operates within the application architecture and network controls you manage.
        </FeatureCard>
        <FeatureCard icon="identity" title="Your identity model">
          Reveal integrates with your application's authentication and authorization model
          instead of introducing a parallel user or permission system.
        </FeatureCard>
        <FeatureCard icon="data" title="Customer-controlled data access">
          Your server supplies credentials and user context at runtime. Reveal does not require
          credentials to be embedded in the browser client.
        </FeatureCard>
        <FeatureCard icon="supply-chain" title="Supply-chain transparency">
          Release-specific CycloneDX SBOMs describe the components in supported server and
          browser client packages. Each downloadable SBOM includes a SHA-256 checksum for
          verifying the SBOM file.
        </FeatureCard>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Shared responsibility</p>
          <h2>Security responsibilities remain explicit</h2>
          <p>
            Reveal provides the embedded analytics components; the host application controls
            how they are authenticated, authorized, configured, deployed, and monitored.
          </p>
        </div>
        <div className={styles.responsibilityGrid}>
          <article>
            <h3>Reveal responsibilities</h3>
            <ul>
              <li>Maintain supported SDK packages and their runtime dependencies.</li>
              <li>Deliver fixes and security updates through supported releases.</li>
              <li>Document security integration points and safe configuration patterns.</li>
              <li>Publish release-specific SBOMs and their file checksums.</li>
            </ul>
          </article>
          <article>
            <h3>Customer responsibilities</h3>
            <ul>
              <li>Authenticate users and authorize every analytics request.</li>
              <li>Enforce tenant isolation and least-privilege data access.</li>
              <li>Protect credentials, encryption keys, and application secrets.</li>
              <li>Secure and patch the host OS, runtime, application, and network.</li>
              <li>Monitor activity and keep Reveal packages on a supported release.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Production checklist</p>
          <h2>Recommended deployment controls</h2>
        </div>
        <ol className={styles.checklist}>
          <li>
            <span>1</span>
            <div>
              <h3>Protect every endpoint</h3>
              <p>
                Require HTTPS, authenticate server endpoints, and apply authorization before
                processing dashboard or data requests.
              </p>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <h3>Propagate trusted user and tenant context</h3>
              <p>
                Derive identity and tenant information on the server. Do not trust identifiers
                supplied only by the browser.
              </p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <h3>Keep credentials server-side</h3>
              <p>
                Store secrets in an appropriate secret store and use least-privilege accounts for
                each data source.
              </p>
            </div>
          </li>
          <li>
            <span>4</span>
            <div>
              <h3>Restrict browser and network access</h3>
              <p>
                Permit only required CORS origins, headers, and methods. Apply your normal proxy,
                gateway, firewall, and rate-limiting controls.
              </p>
            </div>
          </li>
          <li>
            <span>5</span>
            <div>
              <h3>Maintain and monitor the deployment</h3>
              <p>
                Keep the SDK and runtime current, retain security-relevant logs, verify downloaded
                SBOM files using their published checksums, and review SBOM components in the
                context of your deployment.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className={styles.resources} aria-labelledby="resources-heading">
        <div>
          <p className={styles.eyebrow}>Implementation resources</p>
          <h2 id="resources-heading">Configure Reveal securely</h2>
        </div>
        <div className={styles.resourceLinks}>
          <Link to="/web/authentication/">Authentication</Link>
          <Link to="/web/user-context/">User context and tenant isolation</Link>
          <Link to="/web/install-server-sdk/">Server installation</Link>
          <Link to="/trust/sbom/">Software bills of materials</Link>
          <a href="https://www.revealbi.io/security" target="_blank" rel="noopener noreferrer">
            Reveal security architecture
          </a>
        </div>
      </section>

      <section className={styles.report} aria-labelledby="report-heading">
        <div>
          <p className={styles.eyebrow}>Responsible disclosure</p>
          <h2 id="report-heading">Report suspected vulnerabilities privately</h2>
          <p>
            Email <a href="mailto:support@revealbi.io">support@revealbi.io</a> with “Security
            Vulnerability” in the subject. Include the affected product version, platform,
            architecture, impact, and reproduction steps. Do not include credentials, customer
            data, or other secrets.
          </p>
          <p>
            Please do not disclose suspected vulnerabilities in a public GitHub issue before the
            report has been reviewed. Use the public issue tracker only for non-security defects.
          </p>
        </div>
        <a
          className={styles.primaryAction}
          href="mailto:support@revealbi.io?subject=Security%20Vulnerability%20Report">
          Start a private report
        </a>
      </section>
    </TrustCenterLayout>
  );
}

