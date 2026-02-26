import React from 'react';
import Translate from '@docusaurus/Translate';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

const codeSnippet = `const insight = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
});

console.log(insight.explanation);
// "Sales revenue reached $2.4M in Q4 2024..."`;

export default function AiSpotlight(): JSX.Element {
  return (
    <section className={styles.spotlight}>
      <div className="container">
        <div className={styles.spotlightInner}>
          <div className={styles.spotlightContent}>
            <span className={styles.badge}>
              <Translate id="homepage.ai.badge">NEW</Translate>
            </span>
            <h2 className={styles.title}>
              <Translate id="homepage.ai.title">AI-Powered Analytics</Translate>
            </h2>
            <p className={styles.description}>
              <Translate id="homepage.ai.description">
                Generate dashboards from natural language, get AI insights from your data, and build conversational analytics — all with a few lines of code.
              </Translate>
            </p>
            <div className={styles.capabilities}>
              <span className={styles.chip}>
                <Translate id="homepage.ai.capability1">Natural Language Dashboards</Translate>
              </span>
              <span className={styles.chip}>
                <Translate id="homepage.ai.capability2">AI Insights & Forecasts</Translate>
              </span>
              <span className={styles.chip}>
                <Translate id="homepage.ai.capability3">Conversational Chat</Translate>
              </span>
            </div>
            <a href="/ai/getting-started-html/" className={styles.ctaLink}>
              <Translate id="homepage.ai.cta">Start building with AI</Translate> →
            </a>
          </div>
          <div className={styles.spotlightCode}>
            <CodeBlock language="typescript" title="AI Insights">
              {codeSnippet}
            </CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
