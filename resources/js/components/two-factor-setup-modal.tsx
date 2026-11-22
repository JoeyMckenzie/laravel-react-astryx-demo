import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Center } from '@astryxdesign/core/Center';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { Divider } from '@astryxdesign/core/Divider';
import { HStack } from '@astryxdesign/core/HStack';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Spinner } from '@astryxdesign/core/Spinner';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import { Form } from '@inertiajs/react';
import * as stylex from '@stylexjs/stylex';
import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useClipboard } from '@/hooks/use-clipboard';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { confirm } from '@/routes/two-factor';

const styles = stylex.create({
    // QR codes must stay dark-on-white in both color modes to scan reliably.
    qr: {
        width: 224,
        height: 224,
        padding: 8,
        borderRadius: 8,
        backgroundColor: 'white',
    },
});

function TwoFactorSetupStep({
    qrCodeSvg,
    manualSetupKey,
    buttonText,
    onNextStep,
    errors,
}: {
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    buttonText: string;
    onNextStep: () => void;
    errors: string[];
}) {
    const [copiedText, copy] = useClipboard();

    if (errors.length) {
        return (
            <Banner
                status="error"
                title="Something went wrong."
                description={Array.from(new Set(errors)).join(' ')}
            />
        );
    }

    return (
        <VStack gap={4}>
            <Center>
                {qrCodeSvg ? (
                    <div
                        {...stylex.props(styles.qr)}
                        dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                    />
                ) : (
                    <Spinner size="lg" />
                )}
            </Center>
            <Button label={buttonText} variant="primary" onClick={onNextStep} />
            <Divider label="or, enter the code manually" />
            <HStack gap={2} vAlign="end">
                <TextInput
                    label="Setup key"
                    isLabelHidden
                    value={manualSetupKey ?? ''}
                    isReadOnly
                    isLoading={!manualSetupKey}
                    width="100%"
                />
                <IconButton
                    label="Copy setup key"
                    icon={
                        copiedText === manualSetupKey ? (
                            <Check size={16} />
                        ) : (
                            <Copy size={16} />
                        )
                    }
                    isDisabled={!manualSetupKey}
                    onClick={() => manualSetupKey && void copy(manualSetupKey)}
                />
            </HStack>
        </VStack>
    );
}

function TwoFactorVerificationStep({
    onClose,
    onBack,
}: {
    onClose: () => void;
    onBack: () => void;
}) {
    const [code, setCode] = useState('');

    return (
        <Form
            {...confirm.form()}
            onSuccess={onClose}
            resetOnError
            resetOnSuccess
        >
            {({ processing, errors }) => {
                const error = (
                    errors as {
                        confirmTwoFactorAuthentication?: { code?: string };
                    }
                ).confirmTwoFactorAuthentication?.code;

                return (
                    <VStack gap={4}>
                        <TextInput
                            label="Authentication code"
                            htmlName="code"
                            value={code}
                            onChange={(value) =>
                                setCode(
                                    value
                                        .replace(/\D/g, '')
                                        .slice(0, OTP_MAX_LENGTH),
                                )
                            }
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            placeholder="123456"
                            size="lg"
                            hasAutoFocus
                            isDisabled={processing}
                            status={
                                error
                                    ? { type: 'error', message: error }
                                    : undefined
                            }
                        />
                        <HStack gap={2}>
                            <Button
                                label="Back"
                                onClick={onBack}
                                isDisabled={processing}
                                width="100%"
                            />
                            <Button
                                type="submit"
                                label="Confirm"
                                variant="primary"
                                isLoading={processing}
                                isDisabled={code.length < OTP_MAX_LENGTH}
                                width="100%"
                            />
                        </HStack>
                    </VStack>
                );
            }}
        </Form>
    );
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    clearSetupData: () => void;
    fetchSetupData: () => Promise<void>;
    errors: string[];
};

export default function TwoFactorSetupModal({
    isOpen,
    onClose,
    requiresConfirmation,
    twoFactorEnabled,
    qrCodeSvg,
    manualSetupKey,
    clearSetupData,
    fetchSetupData,
    errors,
}: Props) {
    const [showVerificationStep, setShowVerificationStep] = useState(false);

    const modalConfig = twoFactorEnabled
        ? {
              title: 'Two-factor authentication enabled',
              description:
                  'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
              buttonText: 'Close',
          }
        : showVerificationStep
          ? {
                title: 'Verify authentication code',
                description:
                    'Enter the 6-digit code from your authenticator app',
                buttonText: 'Continue',
            }
          : {
                title: 'Enable two-factor authentication',
                description:
                    'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
                buttonText: 'Continue',
            };

    const handleClose = () => {
        if (twoFactorEnabled) {
            clearSetupData();
        }

        setShowVerificationStep(false);
        onClose();
    };

    const handleNextStep = () => {
        if (requiresConfirmation) {
            setShowVerificationStep(true);

            return;
        }

        clearSetupData();
        handleClose();
    };

    const fetchSetupDataRef = useRef(fetchSetupData);

    useEffect(() => {
        fetchSetupDataRef.current = fetchSetupData;
    }, [fetchSetupData]);

    useEffect(() => {
        if (isOpen && !qrCodeSvg) {
            void fetchSetupDataRef.current();
        }
    }, [isOpen, qrCodeSvg]);

    return (
        <Dialog
            isOpen={isOpen}
            onOpenChange={(open) => !open && handleClose()}
            width={448}
            padding={6}
        >
            <VStack gap={4}>
                <DialogHeader
                    title={modalConfig.title}
                    subtitle={modalConfig.description}
                    onOpenChange={(open) => !open && handleClose()}
                    hasDivider={false}
                />
                {showVerificationStep ? (
                    <TwoFactorVerificationStep
                        onClose={handleClose}
                        onBack={() => setShowVerificationStep(false)}
                    />
                ) : (
                    <TwoFactorSetupStep
                        qrCodeSvg={qrCodeSvg}
                        manualSetupKey={manualSetupKey}
                        buttonText={modalConfig.buttonText}
                        onNextStep={handleNextStep}
                        errors={errors}
                    />
                )}
            </VStack>
        </Dialog>
    );
}
