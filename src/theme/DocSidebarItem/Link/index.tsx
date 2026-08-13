import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@theme-original/DocSidebarItem/Link';
import type LinkType from '@theme/DocSidebarItem/Link';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof LinkType>;

// Wrap swizzle: appends a `sidebar-status--<status>` class to the sidebar item
// when its doc declares `sidebar_custom_props.status`. The pill itself is drawn
// in pure CSS (see src/css/custom.css), so this stays a thin, upgrade-safe wrap.
export default function LinkWrapper(props: Props): ReactNode {
    const status = (props.item?.customProps as { status?: string } | undefined)?.status;

    if (typeof status === 'string') {
        const item = {
            ...props.item,
            className: clsx(props.item.className, `sidebar-status--${status}`),
        };
        return <Link {...props} item={item} />;
    }

    return <Link {...props} />;
}
