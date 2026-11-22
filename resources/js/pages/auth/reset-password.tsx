import { Button } from '@astryxdesign/core/Button';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head } from '@inertiajs/react';
import FormTextInput from '@/components/form-text-input';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <VStack gap={4}>
                        <FormTextInput
                            name="email"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            defaultValue={email}
                            isReadOnly
                            error={errors.email}
                        />
                        <FormTextInput
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            hasAutoFocus
                            placeholder="Password"
                            error={errors.password}
                        />
                        <FormTextInput
                            name="password_confirmation"
                            label="Confirm password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Confirm password"
                            error={errors.password_confirmation}
                        />
                        <Button
                            type="submit"
                            label="Reset password"
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

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
};
