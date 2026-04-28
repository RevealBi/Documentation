import { useLocation } from '@docusaurus/router';
const VERSION_PATHS = {
    '1.8.4': '1.8.4',
};
// Resolves the active docs version label from the current URL.
// Returns 'current' for the unreleased docs (no version path prefix).
//
// Why URL-based and not useDocsVersion(): useDocsVersion throws when called
// outside a docs page, so any reuse of this hook on non-docs routes would crash.
export function useDocsVersionFromPath() {
    const { pathname } = useLocation();
    for (const [label, segment] of Object.entries(VERSION_PATHS)) {
        if (pathname.startsWith(`/${segment}/`) || pathname === `/${segment}`) {
            return label;
        }
        if (pathname.startsWith(`/ja/${segment}/`) || pathname === `/ja/${segment}`) {
            return label;
        }
    }
    return 'current';
}
