import { Button } from '@astryxdesign/core/Button';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head } from '@inertiajs/react';
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import FormTextInput from '@/components/form-text-input';
import PasskeyVerify from '@/components/passkey-verify';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <PasskeyVerify
                routes={{ options: confirmOptions(), submit: confirmStore() }}
                label="Confirm with passkey"
                loadingLabel="Confirming..."
                separator="Or confirm with password"
            />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <VStack gap={4}>
                        <FormTextInput
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            hasAutoFocus
                            error={errors.password}
                        />
                        <Button
                            type="submit"
                            label="Confirm password"
                            variant="primary"
                            size="lg"
                            isLoading={processing}
                        />
                    </VStack>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
