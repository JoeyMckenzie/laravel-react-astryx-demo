import { Card } from '@astryxdesign/core/Card';
import { Center } from '@astryxdesign/core/Center';
import { Icon } from '@astryxdesign/core/Icon';
import { Link } from '@astryxdesign/core/Link';
import { Heading, Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import * as stylex from '@stylexjs/stylex';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';

const styles = stylex.create({
    page: {
        minHeight: '100dvh',
    },
});

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <Center role="main" axis="both" padding={6} xstyle={styles.page}>
            <VStack gap={6} hAlign="stretch" width="100%" maxWidth={400}>
                <VStack gap={2} hAlign="center">
                    <Link href={home().url} label="Home" color="primary">
                        <Icon icon={AppLogoIcon} size="lg" />
                    </Link>
                </VStack>
                <Card padding={8} width="100%">
                    <VStack gap={6} hAlign="stretch">
                        <VStack gap={1} hAlign="center">
                            <Heading
                                level={2}
                                accessibilityLevel={1}
                                justify="center"
                            >
                                {title}
                            </Heading>
                            <Text color="secondary" justify="center">
                                {description}
                            </Text>
                        </VStack>
                        {children}
                    </VStack>
                </Card>
            </VStack>
        </Center>
    );
}
