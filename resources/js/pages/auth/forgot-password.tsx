import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head } from '@inertiajs/react';
import FormTextInput from '@/components/form-text-input';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && <Banner status="success" title={status} />}

            <Form {...email.form()}>
                {({ processing, errors }) => (
                    <VStack gap={4}>
                        <FormTextInput
                            name="email"
                            label="Email address"
                            type="email"
                            autoComplete="off"
                            hasAutoFocus
                            placeholder="email@example.com"
                            error={errors.email}
                        />
                        <Button
                            type="submit"
                            label="Email password reset link"
                            variant="primary"
                            size="lg"
                            isLoading={processing}
                        />
                    </VStack>
                )}
            </Form>

            <Text color="secondary" display="block" justify="center">
                Or, return to <Link href={login().url}>log in</Link>
            </Text>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
