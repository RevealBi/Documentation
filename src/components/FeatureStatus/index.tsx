import React, { type ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';

// Central definition for feature-status markers. Today only "preview" exists;
// adding a new status (e.g. "new") is a matter of adding its strings here plus a
// matching CSS block in src/css/custom.css.
//
// The status describes the maturity of the *feature* being documented, not the
// documentation page itself.
//
// All user-facing text goes through Docusaurus i18n (translate() / <Translate>)
// so it is extracted to i18n/<locale>/code.json via `npm run write-translations`.

const FEEDBACK_URL = 'https://github.com/RevealBi/Reveal.Sdk/issues';

// Single source for the short "Preview" label — reused by the inline badge, the
// sidebar pill (src/theme/DocSidebarItem/Link) and the banner. Uses the
// imperative translate() API so the value works as plain text (e.g. title attr).
export function previewLabel(): string {
    return translate({
        id: 'featureStatus.preview.label',
        message: 'Preview',
        description: 'Short badge label marking a documented feature as being in preview',
    });
}

// Inline pill — drop <Preview /> next to a heading or sentence to mark a single
// feature within a page. Exposed globally as <Preview /> via src/theme/MDXComponents.
export function PreviewBadge(): ReactNode {
    const label = previewLabel();
    return (
        <span
            className="featureStatusBadge featureStatusBadge--preview"
            title={label}>
            {label}
        </span>
    );
}

// Page banner — rendered automatically at the top of any doc whose frontmatter
// sets `sidebar_custom_props.status: preview` (see src/theme/DocItem/Content).
export function PreviewBanner(): ReactNode {
    return (
        <aside
            className="featureStatusBanner featureStatusBanner--preview"
            role="note">
            <span className="featureStatusBanner__label">{previewLabel()}</span>
            <div className="featureStatusBanner__body">
                <strong>
                    <Translate
                        id="featureStatus.preview.title"
                        description="Bold lead-in of the preview feature banner">
                        This feature is in preview.
                    </Translate>
                </strong>{' '}
                <Translate
                    id="featureStatus.preview.description"
                    description="Body text of the preview feature banner">
                    It's available for you to try and give feedback on, but its API and behavior may change before it becomes generally available.
                </Translate>{' '}
                <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer">
                    <Translate
                        id="featureStatus.preview.feedbackLink"
                        description="Link text inviting the reader to give feedback on a preview feature">
                        Share feedback
                    </Translate>
                </a>
                .
            </div>
        </aside>
    );
}
