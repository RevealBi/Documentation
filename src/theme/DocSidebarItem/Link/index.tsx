import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/DocSidebarItem/Link';
import { previewLabel } from '@site/src/components/FeatureStatus';
import styles from './styles.module.css';

// Swizzled (eject) copy of the classic DocSidebarItem/Link. The only addition is
// the feature-status pill rendered next to the label when a doc declares
// `sidebar_custom_props.status`. It is ejected rather than wrapped so the pill
// text can go through Docusaurus i18n (translate()) — a CSS ::after label could
// not be localized.

function LinkLabel({ label }: { label: string }): ReactNode {
    return (
        <span title={label} className={styles.linkLabel}>
            {label}
        </span>
    );
}

export default function DocSidebarItemLink({
    item,
    onItemClick,
    activePath,
    level,
    index,
    ...props
}: Props): ReactNode {
    const { href, label, className, autoAddBaseUrl } = item;
    const isActive = isActiveSidebarItem(item, activePath);
    const isInternalLink = isInternalUrl(href);
    const status = (item.customProps as { status?: string } | undefined)?.status;

    return (
        <li
            className={clsx(
                ThemeClassNames.docs.docSidebarItemLink,
                ThemeClassNames.docs.docSidebarItemLinkLevel(level),
                'menu__list-item',
                className,
            )}
            key={label}>
            <Link
                className={clsx(
                    'menu__link',
                    !isInternalLink && styles.menuExternalLink,
                    {
                        'menu__link--active': isActive,
                    },
                )}
                autoAddBaseUrl={autoAddBaseUrl}
                aria-current={isActive ? 'page' : undefined}
                to={href}
                {...(isInternalLink && {
                    onClick: onItemClick ? () => onItemClick(item) : undefined,
                })}
                {...props}>
                <LinkLabel label={label} />
                {status === 'preview' && (
                    <span className="featureStatusBadge featureStatusBadge--preview">
                        {previewLabel()}
                    </span>
                )}
                {!isInternalLink && <IconExternalLink />}
            </Link>
        </li>
    );
}
