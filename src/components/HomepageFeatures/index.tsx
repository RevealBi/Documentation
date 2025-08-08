import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

type FeatureItem = {
  title: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <>
        <Translate id="homepage.feature.web.title" description="The title of the Web feature on the homepage">Web SDK Documentation</Translate>
      </>
    ),
    Svg: require('@site/static/img/developer.svg').default,
    link: "web/",
    description: (
      <>
        <Translate id="homepage.feature.web"
          description="The words used to describe the web sdk on the homepage">Embed data analytics into your HTML/JavaScript, Angular, React, or ASP.NET web applications.</Translate>
      </>
    ),
  },
  {
    title: (
      <>
        <Translate id="homepage.feature.user.title" description="The title of the User Docs feature on the homepage">User Documentation</Translate>
      </>
    ),
    Svg: require('@site/static/img/empty-states.svg').default,
    link: "user/",
    description: (
      <>
        <Translate id="homepage.feature.user"
          description="The words used to describe the user section on the homepage">Explore user-friendly guides and resources tailored for end-users to make the most of data analytics.</Translate>
      </>
    ),
  },
  {
    title: (
      <>
        <Translate id="homepage.feature.video.title" description="The title of the Video feature on the homepage">Videos</Translate>
      </>
    ),
    Svg: require('@site/static/img/video-girl.svg').default,
    link: "https://www.youtube.com/@RevealBI/videos/",
    description: (
      <>
        <Translate id="homepage.feature.video"
          description="The words used to describe the video section on the homepage">Dive into Reveal SDK with step‑by‑step YouTube videos. Hit play and ship your first dashboard today.</Translate>
      </>
    ),
  },
];

function Feature({ link, title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <a href={link}><h3>{title}</h3></a>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
