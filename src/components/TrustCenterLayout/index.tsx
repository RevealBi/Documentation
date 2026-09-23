import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

type TrustCenterPage = 'legal' | 'sbom' | 'security';

type TrustCenterLayoutProps = {
  activePage: TrustCenterPage;
  children: ReactNode;
  description: string;
  title: string;
};

type IconName = 'file' | 'legal' | 'shield';

function TrustCenterIcon({name}: {name: IconName}): React.JSX.Element {
  if (name === 'file') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2.75h8l4 4v14.5H6z" />
        <path d="M14 2.75v4h4M9 11h6M9 15h6M9 19h4" />
      </svg>
    );
  }

  if (name === 'legal') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v18M7 6h10M5 6l-3 6h6zM19 6l-3 6h6zM8 21h8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.75 7 2.7v5.8c0 4.75-2.9 8.45-7 10-4.1-1.55-7-5.25-7-10v-5.8z" />
      <path d="m8.5 12 2.15 2.15L15.75 9" />
    </svg>
  );
}

function navClassName(isActive: boolean): string {
  return isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
}

export default function TrustCenterLayout({
  activePage,
  children,
  description,
  title,
}: TrustCenterLayoutProps): React.JSX.Element {
  return (
    <Layout title={title} description={description}>
      <div className={styles.shell}>
        <aside className={styles.sidebar} aria-label="Trust Center navigation">
          <div className={styles.sidebarInner}>
            <p className={styles.sidebarHeading}>Trust Center</p>
            <nav className={styles.navigation}>
              <Link
                className={navClassName(activePage === 'security')}
                to="/trust/"
                aria-current={activePage === 'security' ? 'page' : undefined}>
                <TrustCenterIcon name="shield" />
                <span>Security</span>
              </Link>
              <Link
                className={navClassName(activePage === 'sbom')}
                to="/trust/sbom/"
                aria-current={activePage === 'sbom' ? 'page' : undefined}>
                <TrustCenterIcon name="file" />
                <span>Software Bill of Materials</span>
              </Link>
              <Link
                className={navClassName(activePage === 'legal')}
                to="/trust/legal/"
                aria-current={activePage === 'legal' ? 'page' : undefined}>
                <TrustCenterIcon name="legal" />
                <span>Legal &amp; licensing</span>
              </Link>
            </nav>
          </div>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </Layout>
  );
}

