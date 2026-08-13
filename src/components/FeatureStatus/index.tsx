import React, { type ReactNode } from 'react';

// Central definition for feature-status markers. Today only "preview" exists;
// adding a new status (e.g. "new") is a matter of extending STATUSES and the
// matching CSS block in src/css/custom.css.
//
// The status describes the maturity of the *feature* being documented, not the
// documentation page itself.

const FEEDBACK_URL = 'https://github.com/RevealBi/Reveal.Sdk/issues';

const STATUSES = {
    preview: {
        label: 'Preview',
        title: 'This feature is in preview.',
        description:
            "It's available for you to try and give feedback on, but its API and " +
            'behavior may change before it becomes generally available.',
    },
} as const;

export type FeatureStatus = keyof typeof STATUSES;

// Inline pill — drop <Preview /> next to a heading or sentence to mark a single
// feature within a page. Exposed globally as <Preview /> via src/theme/MDXComponents.
export function PreviewBadge(): ReactNode {
    return (
        <span
            className="featureStatusBadge featureStatusBadge--preview"
            title={STATUSES.preview.title}>
            {STATUSES.preview.label}
        </span>
    );
}

// Page banner — rendered automatically at the top of any doc whose frontmatter
// sets `sidebar_custom_props.status: preview` (see src/theme/DocItem/Content).
export function PreviewBanner(): ReactNode {
    const { label, title, description } = STATUSES.preview;
    return (
        <aside
            className="featureStatusBanner featureStatusBanner--preview"
            role="note">
            <span className="featureStatusBanner__label">{label}</span>
            <div className="featureStatusBanner__body">
                <strong>{title}</strong> {description}{' '}
                <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer">
                    Share feedback
                </a>
                .
            </div>
        </aside>
    );
}
