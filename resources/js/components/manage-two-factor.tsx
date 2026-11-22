import { Button } from '@astryxdesign/core/Button';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Form } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import PageSection from '@/components/page-section';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { disable, enable } from '@/routes/two-factor';

export type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

export default function ManageTwoFactor(props: Props) {
    const requiresConfirmation = props.requiresConfirmation ?? false;
    const twoFactorEnabled = props.twoFactorEnabled ?? false;

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    if (!(props.canManageTwoFactor ?? false)) {
        return null;
    }

    return (
        <PageSection
            title="Two-factor authentication"
            description="Manage your two-factor authentication settings"
        >
            {twoFactorEnabled ? (
                <VStack gap={4}>
                    <Text color="secondary">
                        You will be prompted for a secure, random pin during
                        login, which you can retrieve from the TOTP-supported
                        application on your phone.
                    </Text>
                    <Form {...disable.form()}>
                        {({ processing }) => (
                            <HStack>
                                <Button
                                    type="submit"
                                    label="Disable 2FA"
                                    variant="destructive"
                                    isLoading={processing}
                                />
                            </HStack>
                        )}
                    </Form>
                    <TwoFactorRecoveryCodes
                        recoveryCodesList={recoveryCodesList}
                        fetchRecoveryCodes={fetchRecoveryCodes}
                        errors={errors}
                    />
                </VStack>
            ) : (
                <VStack gap={4}>
                    <Text color="secondary">
                        When you enable two-factor authentication, you will be
                        prompted for a secure pin during login. This pin can be
                        retrieved from a TOTP-supported application on your
                        phone.
                    </Text>
                    <HStack>
                        {hasSetupData ? (
                            <Button
                                label="Continue setup"
                                variant="primary"
                                icon={<ShieldCheck size={16} />}
                                onClick={() => setShowSetupModal(true)}
                            />
                        ) : (
                            <Form
                                {...enable.form()}
                                onSuccess={() => setShowSetupModal(true)}
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        label="Enable 2FA"
                                        variant="primary"
                                        isLoading={processing}
                                    />
                                )}
                            </Form>
                        )}
                    </HStack>
                </VStack>
            )}

            <TwoFactorSetupModal
                isOpen={showSetupModal}
                onClose={() => setShowSetupModal(false)}
                requiresConfirmation={requiresConfirmation}
                twoFactorEnabled={twoFactorEnabled}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                clearSetupData={clearSetupData}
                fetchSetupData={fetchSetupData}
                errors={errors}
            />
        </PageSection>
    );
}
