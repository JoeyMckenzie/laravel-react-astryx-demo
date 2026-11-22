import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Center } from '@astryxdesign/core/Center';
import { HStack } from '@astryxdesign/core/HStack';
import { Icon } from '@astryxdesign/core/Icon';
import { Link } from '@astryxdesign/core/Link';
import { List, ListItem } from '@astryxdesign/core/List';
import { Heading, Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Head, usePage } from '@inertiajs/react';
import * as stylex from '@stylexjs/stylex';
import AppLogoIcon from '@/components/app-logo-icon';
import { dashboard, login, register } from '@/routes';

const styles = stylex.create({
    page: {
        minHeight: '100dvh',
    },
});

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <Center axis="both" padding={6} xstyle={styles.page}>
                <VStack gap={6} width="100%" maxWidth={640}>
                    <HStack hAlign="between" vAlign="center">
                        <Icon icon={AppLogoIcon} size="lg" />
                        <HStack gap={2}>
                            {auth.user ? (
                                <Button
                                    label="Dashboard"
                                    href={dashboard().url}
                                />
                            ) : (
                                <>
                                    <Button
                                        label="Log in"
                                        variant="ghost"
                                        href={login().url}
                                    />
                                    <Button
                                        label="Register"
                                        href={register().url}
                                    />
                                </>
                            )}
                        </HStack>
                    </HStack>

                    <Card padding={8}>
                        <VStack gap={6}>
                            <VStack gap={2}>
                                <Heading level={1}>Let's get started</Heading>
                                <Text color="secondary">
                                    Laravel has an incredibly rich ecosystem. We
                                    suggest starting with the following.
                                </Text>
                            </VStack>
                            <List listStyle="decimal">
                                <ListItem
                                    label={
                                        <Text>
                                            Read the{' '}
                                            <Link
                                                href="https://laravel.com/docs"
                                                isExternalLink
                                            >
                                                Documentation
                                            </Link>
                                        </Text>
                                    }
                                />
                                <ListItem
                                    label={
                                        <Text>
                                            Watch video tutorials at{' '}
                                            <Link
                                                href="https://laracasts.com"
                                                isExternalLink
                                            >
                                                Laracasts
                                            </Link>
                                        </Text>
                                    }
                                />
                            </List>
                            <HStack>
                                <Button
                                    label="Deploy now"
                                    variant="primary"
                                    href="https://cloud.laravel.com"
                                    target="_blank"
                                />
                            </HStack>
                        </VStack>
                    </Card>
                </VStack>
            </Center>
        </>
    );
}
