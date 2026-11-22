import { AppShell } from '@astryxdesign/core/AppShell';
import { BreadcrumbItem, Breadcrumbs } from '@astryxdesign/core/Breadcrumbs';
import { Icon } from '@astryxdesign/core/Icon';
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout';
import { NavIcon } from '@astryxdesign/core/NavIcon';
import {
    SideNav,
    SideNavHeading,
    SideNavItem,
    SideNavSection,
} from '@astryxdesign/core/SideNav';
import { usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { UserMenu } from '@/components/user-menu';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType, NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItemType[];
    children: React.ReactNode;
}) {
    const { name } = usePage().props;
    const { isCurrentUrl } = useCurrentUrl();

    const sideNav = (
        <SideNav
            collapsible
            header={
                <SideNavHeading
                    icon={<NavIcon icon={<Icon icon={AppLogoIcon} />} />}
                    heading={name}
                    headingHref={dashboard().url}
                />
            }
            footer={<UserMenu />}
        >
            <SideNavSection title="Platform">
                {mainNavItems.map((item) => (
                    <SideNavItem
                        key={item.title}
                        label={item.title}
                        icon={item.icon ?? undefined}
                        href={toUrl(item.href)}
                        isSelected={isCurrentUrl(item.href)}
                    />
                ))}
            </SideNavSection>
            <SideNavSection title="Resources">
                {footerNavItems.map((item) => (
                    <SideNavItem
                        key={item.title}
                        label={item.title}
                        icon={item.icon ?? undefined}
                        href={toUrl(item.href)}
                    />
                ))}
            </SideNavSection>
        </SideNav>
    );

    return (
        <AppShell sideNav={sideNav} variant="wash">
            <Layout
                header={
                    breadcrumbs.length > 0 && (
                        <LayoutHeader hasDivider padding={4}>
                            <Breadcrumbs>
                                {breadcrumbs.map((item, index) => (
                                    <BreadcrumbItem
                                        key={toUrl(item.href)}
                                        href={toUrl(item.href)}
                                        isCurrent={
                                            index === breadcrumbs.length - 1
                                        }
                                    >
                                        {item.title}
                                    </BreadcrumbItem>
                                ))}
                            </Breadcrumbs>
                        </LayoutHeader>
                    )
                }
                content={<LayoutContent padding={6}>{children}</LayoutContent>}
            />
        </AppShell>
    );
}
