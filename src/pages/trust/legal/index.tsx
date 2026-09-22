import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import TrustCenterLayout from '@site/src/components/TrustCenterLayout';
import styles from './styles.module.css';

type ResourceCardProps = {
  children: ReactNode;
  href: string;
  title: string;
};

function ExternalResourceCard({children, href, title}: ResourceCardProps): React.JSX.Element {
  return (
    <article className={styles.card}>
      <h2>{title}</h2>
      <p>{children}</p>
      <a href={href} target="_blank" rel="noopener noreferrer">
        View official document <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export default function LegalAndLicensing(): React.JSX.Element {
  return (
    <TrustCenterLayout
      activePage="legal"
      title="Legal and licensing"
      description="Access Reveal legal policies, the SDK license agreement, and third-party software information.">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <span>Trust Center</span>
        <span aria-hidden="true">/</span>
        <span>Legal &amp; licensing</span>
      </nav>

      <header className={styles.header}>
        <p className={styles.eyebrow}>Legal &amp; licensing</p>
        <h1>Policies, agreements, and software notices</h1>
        <p>
          Use these resources to review the terms that govern Reveal, understand how personal
          information and cookies are handled, and inspect third-party software disclosures.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="agreements-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Agreements and policies</p>
          <h2 id="agreements-heading">Legal documents</h2>
        </div>
        <div className={styles.cardGrid}>
          <ExternalResourceCard
            title="Reveal SDK License Agreement"
            href="https://www.revealbi.io/license-agreements/embedded-sdk">
            Review the software license agreement that applies to the Reveal SDK and its related
            components and documentation.
          </ExternalResourceCard>
          <ExternalResourceCard
            title="Terms of Use"
            href="https://www.revealbi.io/terms-of-use">
            Review the terms that apply when accessing and using Infragistics websites and online
            resources.
          </ExternalResourceCard>
          <ExternalResourceCard
            title="Privacy Policy"
            href="https://www.revealbi.io/privacy-policy">
            Learn how Infragistics collects, uses, discloses, and protects personal information.
          </ExternalResourceCard>
          <ExternalResourceCard
            title="Cookie Policy"
            href="https://www.revealbi.io/cookie-policy">
            Learn how Infragistics websites use cookies and similar technologies.
          </ExternalResourceCard>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="software-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Software transparency</p>
          <h2 id="software-heading">Component and license information</h2>
        </div>
        <div className={styles.softwareGrid}>
          <article className={styles.softwareCard}>
            <div>
              <h3>Third-party open-source software</h3>
              <p>
                Review third-party components used by the Reveal Web SDK and their associated
                licenses.
              </p>
            </div>
            <Link to="/web/third-party-software/">View third-party software</Link>
          </article>
          <article className={styles.softwareCard}>
            <div>
              <h3>Software Bill of Materials</h3>
              <p>
                Download release-specific CycloneDX inventories for supported Reveal production
                server packages.
              </p>
            </div>
            <Link to="/trust/sbom/">Browse SBOMs</Link>
          </article>
        </div>
      </section>
    </TrustCenterLayout>
  );
}
