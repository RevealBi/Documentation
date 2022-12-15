import React from "react";
import clsx from 'clsx';

import DocSidebarItemHtml from '@theme/DocSidebarItem/Html';

import { ThemeClassNames } from '@docusaurus/theme-common';
import SidebarStyles from '@docusaurus/theme-classic/lib/theme/DocPage/Layout/Sidebar/styles.module.css';
import styles from './styles.module.css';

interface PageSidebarProps {
    items: any[];
    onItemClick: (item: any) => void;
}

export default function PageSideBar({ items, onItemClick }: PageSidebarProps): JSX.Element {

    return (
        <aside className={clsx(ThemeClassNames.docs.docSidebarContainer, SidebarStyles.docSidebarContainer)}>
            <div style={{ margin: "65px 0 0 0" }}>
                <nav className={clsx('menu thin-scrollbar', styles.menu)}>
                    {/* I hacked this menu together. revisit later */}
                    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
                        {items.map((item, idx) => {
                            if (item.type) {
                                return (
                                    // @ts-ignore
                                    <DocSidebarItemHtml key={idx} item={item} />
                                );
                            }
                            else {
                                return (
                                    <li key={idx} className={clsx(ThemeClassNames.docs.docSidebarItemLink, ThemeClassNames.docs.docSidebarItemLinkLevel(1), 'menu__list-item')}>
                                        <a className="menu__link" onClick={() => onItemClick(item)} style={{cursor: "default"}}>{item.label}</a>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}