import React, { type ReactNode } from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { PreviewBanner } from '@site/src/components/FeatureStatus';

type Props = WrapperProps<typeof ContentType>;

// Wrap swizzle: renders a feature-status banner above the doc content when the
// page's frontmatter declares one. Driven by `sidebar_custom_props.status` so a
// single frontmatter field feeds both this banner and the sidebar pill
// (see src/theme/DocSidebarItem/Link).
export default function ContentWrapper(props: Props): ReactNode {
    const { frontMatter } = useDoc();
    const status = (frontMatter?.sidebar_custom_props as { status?: string } | undefined)?.status;

    return (
        <>
            {status === 'preview' && <PreviewBanner />}
            <Content {...props} />
        </>
    );
}
