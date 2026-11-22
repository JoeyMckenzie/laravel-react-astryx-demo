import { Button } from '@astryxdesign/core/Button';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { useState } from 'react';
import FormTextInput from '@/components/form-text-input';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

const content = {
    recovery: {
        title: 'Recovery code',
        description:
            'Please confirm access to your account by entering one of your emergency recovery codes.',
        toggleText: 'login using an authentication code',
    },
    code: {
        title: 'Authentication code',
        description:
            'Enter the authentication code provided by your authenticator application.',
        toggleText: 'login using a recovery code',
    },
};

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState(false);
    const [code, setCode] = useState('');
    const current = showRecoveryInput ? content.recovery : content.code;

    setLayoutProps({
        title: current.title,
        description: current.description,
    });

    return (
        <>
            <Head title="Two-factor authentication" />

            <Form
                {...store.form()}
                resetOnError
                resetOnSuccess={!showRecoveryInput}
            >
                {({ errors, processing, clearErrors }) => (
                    <VStack gap={4}>
                        {showRecoveryInput ? (
                            <FormTextInput
                                key="recovery"
                                name="recovery_code"
                                label="Recovery code"
                                placeholder="Enter recovery code"
                                hasAutoFocus
                                isRequired
                                error={errors.recovery_code}
                            />
                        ) : (
                            <TextInput
                                key="code"
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
                                    errors.code
                                        ? {
                                              type: 'error',
                                              message: errors.code,
                                          }
                                        : undefined
                                }
                            />
                        )}

                        <Button
                            type="submit"
                            label="Continue"
                            variant="primary"
                            size="lg"
                            isLoading={processing}
                        />

                        <Text
                            color="secondary"
                            display="block"
                            justify="center"
                        >
                            or you can{' '}
                            <Link
                                onClick={() => {
                                    setShowRecoveryInput(!showRecoveryInput);
                                    clearErrors();
                                    setCode('');
                                }}
                            >
                                {current.toggleText}
                            </Link>
                        </Text>
                    </VStack>
                )}
            </Form>
        </>
    );
}
