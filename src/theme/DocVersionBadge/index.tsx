import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocVersionBadge';

// Decouples the badge text from the dropdown label.
// Source of truth: customFields.docsVersions in docusaurus.config.ts.
// Falls back to versionMetadata.label if the version id isn't mapped.
export default function DocVersionBadge({ className }: Props): ReactNode {
    const versionMetadata = useDocsVersion();
    const { siteConfig } = useDocusaurusContext();

    if (!versionMetadata.badge) return null;

    const docsVersions = siteConfig.customFields?.docsVersions as Record<string, string> | undefined;
    const versionLabel = docsVersions?.[versionMetadata.version] ?? versionMetadata.label;

    return (
        <span
            className={clsx(
                className,
                ThemeClassNames.docs.docVersionBadge,
                'badge badge--secondary',
            )}>
            <Translate
                id="theme.docs.versionBadge.label"
                values={{ versionLabel }}>
                {'Version: {versionLabel}'}
            </Translate>
        </span>
    );
}
