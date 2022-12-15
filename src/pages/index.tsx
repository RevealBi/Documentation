import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Translate from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title" style={{fontSize: "55px"}}><Translate id="homepage.hero.title" description="The title of the hero section on the homepage">New to Reveal? We've got you covered!</Translate></h1>
        <p className="hero__subtitle"><Translate id="homepage.hero.subtitle" description="The subtitle of the hero section on the homepage">Get help with integration, data visualization design, dashboard creation, and more.</Translate></p>
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
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
