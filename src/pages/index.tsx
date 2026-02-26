import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import AiSpotlight from '@site/src/components/AiSpotlight';
import FrameworkPicker from '@site/src/components/FrameworkPicker';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <Translate id="homepage.hero.title">
            Build Intelligent Analytics Into Your Apps
          </Translate>
        </h1>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.subtitle">
            Embed interactive dashboards, AI-powered insights, and conversational data exploration into any web application.
          </Translate>
        </p>
        <div className={styles.ctaContainer}>
          <a href="/web/getting-started-javascript/" className={styles.ctaButton}>
            <Translate id="homepage.hero.cta.getStarted">Get Started</Translate>
          </a>
          <a href="/ai/overview/" className={styles.ctaButtonOutline}>
            <Translate id="homepage.hero.cta.exploreAi">Explore AI SDK</Translate>
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Get help with ${siteConfig.title}`}
      description="The Reveal embedded analytics platform allows you to simplify the way you integrate, manage and pay for data analytics.">
      <HomepageHeader />
      <main>
        <AiSpotlight />
        <HomepageFeatures />
        <FrameworkPicker />
      </main>
    </Layout>
  );
}
