import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head, router } from '@inertiajs/react';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <Banner
                    status="success"
                    title="A new verification link has been sent to the email address you provided during registration."
                />
            )}

            <Form {...send.form()}>
                {({ processing }) => (
                    <VStack gap={2}>
                        <Button
                            type="submit"
                            label="Resend verification email"
                            isLoading={processing}
                        />
                        <Button
                            label="Log out"
                            variant="ghost"
                            onClick={() => router.post(logout().url)}
                        />
                    </VStack>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Email verification',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
