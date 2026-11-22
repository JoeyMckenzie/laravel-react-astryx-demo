import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import type { AnchorHTMLAttributes } from 'react';

/**
 * Lets every Astryx link (SideNavItem, Button href, Link, BreadcrumbItem…)
 * navigate through Inertia. External and new-tab links stay plain anchors.
 */
export function InertiaLink({
    href = '',
    target,
    ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
    if (target === '_blank' || /^https?:\/\//.test(href)) {
        return <a href={href} target={target} {...props} />;
    }

    // Astryx passes plain anchor props; Inertia's Link accepts them at runtime.
    return <Link href={href} {...(props as Omit<InertiaLinkProps, 'href'>)} />;
}
