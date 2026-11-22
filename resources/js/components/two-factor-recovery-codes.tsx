import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { HStack } from '@astryxdesign/core/HStack';
import { Skeleton } from '@astryxdesign/core/Skeleton';
import { Heading, Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Form } from '@inertiajs/react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

type Props = {
    recoveryCodesList: string[];
    fetchRecoveryCodes: () => Promise<void>;
    errors: string[];
};

export default function TwoFactorRecoveryCodes({
    recoveryCodesList,
    fetchRecoveryCodes,
    errors,
}: Props) {
    const [codesAreVisible, setCodesAreVisible] = useState(false);

    useEffect(() => {
        if (!recoveryCodesList.length) {
            void fetchRecoveryCodes();
        }
    }, [recoveryCodesList.length, fetchRecoveryCodes]);

    return (
        <Card>
            <VStack gap={4}>
                <VStack gap={1}>
                    <Heading level={4}>2FA recovery codes</Heading>
                    <Text color="secondary">
                        Recovery codes let you regain access if you lose your
                        2FA device. Store them in a secure password manager.
                    </Text>
                </VStack>

                <HStack gap={2} hAlign="between" wrap="wrap">
                    <Button
                        label={`${codesAreVisible ? 'Hide' : 'View'} recovery codes`}
                        variant="primary"
                        icon={
                            codesAreVisible ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )
                        }
                        onClick={() => setCodesAreVisible(!codesAreVisible)}
                        aria-expanded={codesAreVisible}
                    />
                    {codesAreVisible && recoveryCodesList.length > 0 && (
                        <Form
                            {...regenerateRecoveryCodes.form()}
                            options={{ preserveScroll: true }}
                            onSuccess={fetchRecoveryCodes}
                        >
                            {({ processing }) => (
                                <Button
                                    type="submit"
                                    label="Regenerate codes"
                                    icon={<RefreshCw size={16} />}
                                    isLoading={processing}
                                />
                            )}
                        </Form>
                    )}
                </HStack>

                {codesAreVisible &&
                    (errors.length ? (
                        <Banner
                            status="error"
                            title="Something went wrong."
                            description={Array.from(new Set(errors)).join(' ')}
                        />
                    ) : (
                        <VStack gap={3}>
                            <Card variant="muted">
                                <VStack gap={1} aria-label="Recovery codes">
                                    {recoveryCodesList.length
                                        ? recoveryCodesList.map((code) => (
                                              <Text key={code} type="code">
                                                  {code}
                                              </Text>
                                          ))
                                        : Array.from({ length: 8 }, (_, i) => (
                                              <Skeleton
                                                  key={i}
                                                  index={i}
                                                  height={16}
                                              />
                                          ))}
                                </VStack>
                            </Card>
                            <Text type="supporting" color="secondary">
                                Each recovery code can be used once to access
                                your account and will be removed after use. If
                                you need more, click{' '}
                                <Text type="inherit" weight="bold">
                                    Regenerate codes
                                </Text>{' '}
                                above.
                            </Text>
                        </VStack>
                    ))}
            </VStack>
        </Card>
    );
}
