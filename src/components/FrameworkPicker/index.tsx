import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FrameworkItem = {
  label: JSX.Element;
  link: string;
  badge?: string;
};

const frameworks: FrameworkItem[] = [
  {
    label: <Translate id="homepage.frameworks.html">HTML / JavaScript</Translate>,
    link: '/web/getting-started-javascript/',
  },
  {
    label: <Translate id="homepage.frameworks.react">React</Translate>,
    link: '/web/getting-started-react/',
  },
  {
    label: <Translate id="homepage.frameworks.angular">Angular</Translate>,
    link: '/web/getting-started-angular/',
  },
  {
    label: <Translate id="homepage.frameworks.aspnet">ASP.NET</Translate>,
    link: '/web/getting-started-server/',
    badge: 'Server',
  },
  {
    label: <Translate id="homepage.frameworks.node">Node.js</Translate>,
    link: '/web/getting-started-server-node/',
    badge: 'Server',
  },
  {
    label: <Translate id="homepage.frameworks.springboot">Spring Boot</Translate>,
    link: '/web/getting-started-spring-boot-jersey/',
    badge: 'Server',
  },
];

export default function FrameworkPicker(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <Translate id="homepage.frameworks.title">Choose Your Stack</Translate>
        </h2>
        <p className={styles.sectionSubtitle}>
          <Translate id="homepage.frameworks.subtitle">
            Step-by-step getting started guides for your preferred framework.
          </Translate>
        </p>
        <div className={styles.grid}>
          {frameworks.map((fw, idx) => (
            <a key={idx} href={fw.link} className={styles.card}>
              <span className={styles.cardLabel}>
                {fw.label}
                {fw.badge && <span className={styles.cardBadge}> {fw.badge}</span>}
              </span>
              <span className={styles.cardArrow}>›</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
