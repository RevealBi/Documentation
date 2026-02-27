import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const DeveloperSvg = require('@site/static/img/developer.svg').default;

function SparkleIcon() {
  return (
    <svg className={styles.cardIcon} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 2L28.5 18.5L45 24L28.5 29.5L24 46L19.5 29.5L3 24L19.5 18.5L24 2Z" fill="url(#sparkle-gradient)" />
      <defs>
        <linearGradient id="sparkle-gradient" x1="3" y1="2" x2="45" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbb365" />
          <stop offset="1" stopColor="#ec417a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type QuickLink = {
  label: JSX.Element;
  href: string;
};

const webQuickLinks: QuickLink[] = [
  { label: <Translate id="homepage.sdk.web.link.getStarted">Getting Started</Translate>, href: '/web/getting-started-javascript/' },
  { label: <Translate id="homepage.sdk.web.link.dataSources">Data Sources</Translate>, href: '/web/datasources/' },
  { label: <Translate id="homepage.sdk.web.link.apiRef">API Reference</Translate>, href: 'https://help.revealbi.io/api/javascript/latest/' },
  { label: <Translate id="homepage.sdk.web.link.playground">Developer Playground</Translate>, href: '/playground/' },
];

const aiQuickLinks: QuickLink[] = [
  { label: <Translate id="homepage.sdk.ai.link.overview">Overview</Translate>, href: '/ai/overview/' },
  { label: <Translate id="homepage.sdk.ai.link.getStarted">Getting Started</Translate>, href: '/ai/getting-started-html/' },
  { label: <Translate id="homepage.sdk.ai.link.insights">Insights API</Translate>, href: '/ai/insights/' },
  { label: <Translate id="homepage.sdk.ai.link.chat">Chat API</Translate>, href: '/ai/chat/' },
];

function QuickLinkList({ links }: { links: QuickLink[] }) {
  return (
    <ul className={styles.quickLinks}>
      {links.map((link, idx) => (
        <li key={idx} className={styles.quickLink}>
          <span className={styles.quickLinkArrow}>›</span>
          <Link to={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

function Labels({ items }: { items: string[] }) {
  return (
    <div className={styles.labels}>
      {items.map((item, idx) => (
        <span key={idx} className={styles.label}>{item}</span>
      ))}
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Web SDK Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <DeveloperSvg className={styles.cardIcon} role="img" />
              <div className={styles.cardTitleGroup}>
                <h3 className={styles.cardTitle}>
                  <Translate id="homepage.sdk.web.title">Web SDK</Translate>
                </h3>
                <p className={styles.cardSubtitle}>
                  <Translate id="homepage.sdk.web.subtitle">Embedded Analytics</Translate>
                </p>
              </div>
            </div>
            <p className={styles.cardDescription}>
              <Translate id="homepage.sdk.web.description">
                Embed interactive dashboards and data visualizations into any web application. Supports 30+ data sources with full customization.
              </Translate>
            </p>
            <QuickLinkList links={webQuickLinks} />
            <Labels items={['HTML/JS', 'React', 'Angular', 'ASP.NET']} />
          </div>

          {/* AI SDK Card */}
          <div className={clsx(styles.card, styles.cardAccent)}>
            <div className={styles.cardHeader}>
              <SparkleIcon />
              <div className={styles.cardTitleGroup}>
                <h3 className={styles.cardTitle}>
                  <Translate id="homepage.sdk.ai.title">AI SDK</Translate>
                </h3>
                <p className={styles.cardSubtitle}>
                  <Translate id="homepage.sdk.ai.subtitle">Intelligent Analytics</Translate>
                </p>
              </div>
            </div>
            <p className={styles.cardDescription}>
              <Translate id="homepage.sdk.ai.description">
                Add AI-powered insights, natural language dashboards, and conversational analytics using LLMs like OpenAI, Anthropic, and Google.
              </Translate>
            </p>
            <QuickLinkList links={aiQuickLinks} />
            <Labels items={['OpenAI', 'Anthropic', 'Google']} />
          </div>
        </div>
      </div>
    </section>
  );
}
