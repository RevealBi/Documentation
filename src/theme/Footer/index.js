import React from 'react';
import Footer from '@theme-original/Footer';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FooterWrapper(props) {

  const { i18n } = useDocusaurusContext();
  
  if (i18n.currentLocale == "en") {
    return (
      <>
        <Footer {...props} />
      </>
    );
  }

  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  fixLinks(links);

  function fixLinks(links) {
    links.forEach(link => {
      fixJapaneseLinks(link.items);
    });
  }

  function fixJapaneseLinks(links){
    links.forEach(link => {
      if(link.href_jp) {
        link.href = link.href_jp;
      }
    })
  }

  return (
    <FooterLayout
      style={style}
      links={links && links.length > 0 && <FooterLinks links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}
