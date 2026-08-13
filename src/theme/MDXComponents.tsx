import MDXComponents from '@theme-original/MDXComponents';
import { PreviewBadge } from '@site/src/components/FeatureStatus';

// Makes <Preview /> usable inline in any .md/.mdx file with no per-file import,
// for marking a single feature/section within a page as preview.
export default {
    ...MDXComponents,
    Preview: PreviewBadge,
};
