import { Heading, Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { HStack } from '@astryxdesign/core/HStack';
import { VStack } from '@astryxdesign/core/VStack';
import * as stylex from '@stylexjs/stylex';
import type { PropsWithChildren } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const styles = stylex.create({
    content: {
        flexGrow: 1,
        flexBasis: 320,
        minWidth: 0,
    },
});

const sidebarNavItems: NavItem[] = [
    { title: 'Profile', href: edit() },
    { title: 'Security', href: editSecurity() },
    { title: 'Appearance', href: editAppearance() },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <VStack gap={8}>
            <VStack gap={1}>
                <Heading level={2}>Settings</Heading>
                <Text color="secondary">
                    Manage your profile and account settings
                </Text>
            </VStack>

            <HStack gap={10} vAlign="start" wrap="wrap">
                <VStack as="nav" aria-label="Settings" width={192}>
                    <List density="compact" edge="flush">
                        {sidebarNavItems.map((item) => (
                            <ListItem
                                key={item.title}
                                label={item.title}
                                href={toUrl(item.href)}
                                isSelected={isCurrentOrParentUrl(item.href)}
                            />
                        ))}
                    </List>
                </VStack>

                <VStack gap={10} maxWidth={640} xstyle={styles.content}>
                    {children}
                </VStack>
            </HStack>
        </VStack>
    );
}
