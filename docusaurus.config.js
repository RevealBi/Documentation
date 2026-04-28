import { themes as prismThemes } from 'prism-react-renderer';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
import replace from './plugins/remark/replace-variables';
import apiDocs from './plugins/remark/api-docs';
import { chatButtonSettings, searchBarSettings } from './inkeep.config';
// SDK version: exact build referenced by CodePreview's CDN URL — must match a real release.
const sdkVersion = "2.0.0";
const sdkVersion_v1 = "1.8.4";
// Docs version: human-readable label shown in the page version badge ("Version: X").
// Bump this as the 2.x docs evolve — no need to archive the version.
const docsVersion = "2.0";
const docsVersion_v1 = "1.8.4";
const config = {
    title: 'Reveal',
    tagline: 'Embedded Analytics & Business Intelligence Tools',
    url: 'https://help.revealbi.io',
    baseUrl: '/',
    onBrokenAnchors: 'warn',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    trailingSlash: true,
    // Per-version values exposed to client components. Keyed by docs version id ("current" or the snapshot label).
    customFields: {
        sdkVersion: sdkVersion,
        sdkVersions: {
            current: sdkVersion,
            "1.8.4": sdkVersion_v1,
        },
        // Used by the swizzled DocVersionBadge to show "Version: <docsVersion>" on each page.
        docsVersions: {
            current: docsVersion,
            "1.8.4": docsVersion_v1,
        },
    },
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'RevealBi', // Usually your GitHub org/user name.
    projectName: 'Documentation', // Usually your repo name.
    plugins: [
        ["docusaurus-node-polyfills", { onlyAliases: ["process"] }],
        ["@inkeep/cxkit-docusaurus", { ChatButton: chatButtonSettings, SearchBar: searchBarSettings }],
        ["@docusaurus/plugin-google-tag-manager", { containerId: "GTM-WXWCMQZ" }],
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
                    lastVersion: 'current',
                    versions: {
                        current: {
                            label: 'Current',
                            path: '',
                        },
                        '1.8.4': {
                            label: '1.8.4',
                            path: '1.8.4',
                        },
                    },
                    beforeDefaultRemarkPlugins: [
                        [apiDocs, {}]
                    ],
                    remarkPlugins: [
                        [npm2yarn, { sync: true }],
                        [replace, {
                                variablesByVersion: {
                                    current: [
                                        { name: "sdkVersion", value: sdkVersion }
                                    ],
                                    "1.8.4": [
                                        { name: "sdkVersion", value: sdkVersion_v1 }
                                    ],
                                },
                            }],
                    ],
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            },
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
                        { label: "AI", to: "ai/overview" },
                        { label: "User", to: "user" },
                    ]
                },
                {
                    label: "API",
                    position: "left",
                    items: [
                        { label: "ASP.NET", to: "https://help.revealbi.io/api/aspnet/latest/Reveal.Sdk.html", target: "blank" },
                        { label: "JAVA", to: "https://help.revealbi.io/api/java/latest/", target: "blank" },
                        { label: "JavaScript", to: "https://help.revealbi.io/api/javascript/latest/", target: "blank" },
                    ]
                },
                {
                    label: "Learn",
                    position: "left",
                    items: [
                        { label: "Blogs", to: "https://www.revealbi.io/blog" },
                        { label: "Developer Playground", to: "playground" },
                        { label: "Samples", to: "https://github.com/RevealBi/sdk-samples-javascript" },
                        { label: "Videos", to: "https://www.youtube.com/@RevealBI" }
                    ]
                },
                {
                    type: "docsVersionDropdown",
                    position: "right",
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
                            label: 'AI SDK',
                            to: 'ai/overview',
                        },
                        { label: "User", to: "user" },
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
    },
    markdown: {
        mermaid: true,
        hooks: {
            onBrokenMarkdownLinks: 'throw',
            onBrokenMarkdownImages: 'throw',
        }
    },
    themes: ['@docusaurus/theme-mermaid']
};
export default config;
