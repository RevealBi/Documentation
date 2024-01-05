// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Reveal',
  tagline: 'Embedded Analytics & Business Intelligence Tools',
  url: 'https://help.revealbi.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'RevealBi', // Usually your GitHub org/user name.
  projectName: 'Documentation', // Usually your repo name.

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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          breadcrumbs: false,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/RevealBi/documentation/tree/master/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
            [require("./plugins/remark/replace-variables"), {
              variables: [
                { name: "sdkVersion", value: "1.6.2" }
              ]
            }],
          ],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp", "java"],
      },
    }),
  markdown: {
      mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid']
};

module.exports = config;
