import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
import replace from './plugins/remark/replace-variables';
import apiDocs from './plugins/remark/api-docs';
const { ProvidePlugin } = require("webpack");

const config: Config = {
  title: 'Reveal',
  tagline: 'Embedded Analytics & Business Intelligence Tools',
  url: 'https://help.revealbi.io',
  baseUrl: '/',
  onBrokenAnchors: 'warn',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'RevealBi', // Usually your GitHub org/user name.
  projectName: 'Documentation', // Usually your repo name.

  plugins: [
    ["docusaurus-node-polyfills", { onlyAliases: ["process"] }]
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    localeConfigs: {
      en: {
        label: "English",
        htmlLang: 'en-US',
      },
      ja: {
        label: "日本語",
        htmlLang: 'ja-JP',
        path: 'ja'
      }
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: "/",
          breadcrumbs: false,
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/RevealBi/documentation/tree/master/',
          beforeDefaultRemarkPlugins: [
            [ apiDocs, {}]
          ],
          remarkPlugins: [
            [ npm2yarn, { sync: true } ],
            [ replace, {
              variables: [
                { name: "sdkVersion", value: "1.7.0" }
              ]
            }],
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: 'QBVJ183IXZ',
      apiKey: 'be244eaae98ce29feeb1882558494e62',
      indexName: 'help-revealbi',
    },
    navbar: {
      title: 'Reveal',
      logo: {
        alt: 'Reveal',
        src: 'img/logo.png',
      },
      items: [
        {
          label: "Documentation",
          position: "left",
          items: [
            { label: "Web", to: "web" },
            { label: "WPF", to: "wpf" },
            { label: "DOM", to: "https://github.com/RevealBi/Reveal.Sdk.Dom" },
          ]
        },
        {
          label: "API",
          position: "left",
          items: [
            { label: "ASP.NET", to: "https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.html", target: "blank" },
            { label: "JAVA", to: "https://help.revealbi.io/api/java/latest/", target: "blank" },
            { label: "JavaScript", to: "https://help.revealbi.io/api/javascript/latest/", target: "blank" },
            { label: "WPF", to: "https://help.revealbi.io/api/wpf/latest/Reveal.Sdk.html", target: "blank" }
          ]
        },
        {
          label: "Learn",
          position: "left",
          items: [
            { label: "Blogs", to: "https://www.revealbi.io/blog" },
            { label: "Developer Playground", to: "playground" },
            { label: "Samples", to: "https://github.com/RevealBi/sdk-samples-javascript" },
            { label: "Videos", to: "https://www.youtube.com/playlist?list=PLZ4rRHIJepBt-USWdh-9BimHh-GjPAGUH" }
          ]
        },
        {
          type: "localeDropdown",
          position: "right"
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Web SDK',
              to: 'web',
            },
            {
              label: 'WPF SDK',
              to: 'wpf',
            },
            {
              label: 'DOM',
              href: 'https://github.com/RevealBi/Reveal.Sdk.Dom',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Who are We',
              href: 'https://www.revealbi.io/about-us',
              "href_jp": "https://www.revealbi.io/jp/about-us",
            },
            {
              label: 'Contact Us',
              href: 'https://www.revealbi.io/about-us?#request-demo',
              "href_jp": "https://www.revealbi.io/jp/about-us#request-demo",
            },
            {
              label: 'Global Offices',
              href: 'https://www.revealbi.io/about-us?#connect',
              "href_jp": "https://www.revealbi.io/jp/about-us#connect",
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Support',
              href: 'https://github.com/RevealBi/Reveal.Sdk/issues',
              "href_jp": "https://jp.infragistics.com/my-account/submit-support-request/reveal",
            },
            {
              label: 'Glossary',
              href: 'https://www.revealbi.io/glossary',
            },
            {
              label: 'FAQs',
              href: 'https://www.revealbi.io/faq',
              "href_jp": "https://www.revealbi.io/jp/faq",
            },
            {
              label: 'Blogs',
              href: 'https://www.revealbi.io/blog',
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Privacy Policy",
              href: "https://www.infragistics.com/legal/privacy",
              "href_jp": "https://jp.infragistics.com/legal/privacy",
            },
            {
              label: "Cookies",
              href: "https://www.infragistics.com/legal/cookie-policy",
              "href_jp": "https://jp.infragistics.com/legal/cookie-policy",
            },
            {
              label: "Terms of Use",
              href: "https://www.infragistics.com/legal/terms-of-use",
              "href_jp": "https://jp.infragistics.com/legal/terms-of-use",
            },
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Infragistics. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ["csharp", "java", "bash", "typescript"],
    },
  } satisfies Preset.ThemeConfig,
  markdown: {
      mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid']
};

export default config;
