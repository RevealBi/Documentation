import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
// Decouples the badge text from the dropdown label.
// Source of truth: customFields.docsVersions in docusaurus.config.ts.
// Falls back to versionMetadata.label if the version id isn't mapped.
export default function DocVersionBadge({ className }) {
    const versionMetadata = useDocsVersion();
    const { siteConfig } = useDocusaurusContext();
    if (!versionMetadata.badge)
        return null;
    const docsVersions = siteConfig.customFields?.docsVersions;
    const versionLabel = docsVersions?.[versionMetadata.version] ?? versionMetadata.label;
    return (<span className={clsx(className, ThemeClassNames.docs.docVersionBadge, 'badge badge--secondary')}>
            <Translate id="theme.docs.versionBadge.label" values={{ versionLabel }}>
                {'Version: {versionLabel}'}
            </Translate>
        </span>);
}
