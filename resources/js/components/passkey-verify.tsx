import { Button } from '@astryxdesign/core/Button';
import { Divider } from '@astryxdesign/core/Divider';
import { FieldStatus } from '@astryxdesign/core/FieldStatus';
import { VStack } from '@astryxdesign/core/VStack';
import type { UrlMethodPair } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { usePasskeyVerify } from '@laravel/passkeys/react';
import { KeyRound } from 'lucide-react';

type Props = {
    routes?: {
        options: UrlMethodPair;
        submit: UrlMethodPair;
    };
    label?: string;
    loadingLabel?: string;
    separator?: string;
};

export default function PasskeyVerify({
    routes,
    label,
    loadingLabel,
    separator,
}: Props = {}) {
    const { verify, isLoading, error, isSupported } = usePasskeyVerify({
        ...(routes && {
            routes: {
                options: routes.options.url,
                submit: routes.submit.url,
            },
        }),
        onSuccess: (response) => {
            router.visit(response.redirect ?? '/dashboard');
        },
    });

    if (!isSupported) {
        return null;
    }

    return (
        <VStack gap={4}>
            <Button
                label={
                    isLoading
                        ? (loadingLabel ?? 'Authenticating...')
                        : (label ?? 'Sign in with a passkey')
                }
                icon={<KeyRound size={16} />}
                size="lg"
                onClick={() => void verify()}
                isLoading={isLoading}
            />
            {error && (
                <FieldStatus type="error" message={error} variant="detached" />
            )}
            <Divider label={separator ?? 'Or continue with email'} />
        </VStack>
    );
}
