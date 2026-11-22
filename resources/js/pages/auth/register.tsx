import { Button } from '@astryxdesign/core/Button';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head } from '@inertiajs/react';
import FormTextInput from '@/components/form-text-input';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
            >
                {({ processing, errors }) => (
                    <VStack gap={4}>
                        <FormTextInput
                            name="name"
                            label="Name"
                            isRequired
                            hasAutoFocus
                            autoComplete="name"
                            placeholder="Full name"
                            error={errors.name}
                        />
                        <FormTextInput
                            name="email"
                            label="Email address"
                            type="email"
                            isRequired
                            autoComplete="email"
                            placeholder="email@example.com"
                            error={errors.email}
                        />
                        <FormTextInput
                            name="password"
                            label="Password"
                            type="password"
                            isRequired
                            autoComplete="new-password"
                            placeholder="Password"
                            error={errors.password}
                        />
                        <FormTextInput
                            name="password_confirmation"
                            label="Confirm password"
                            type="password"
                            isRequired
                            autoComplete="new-password"
                            placeholder="Confirm password"
                            error={errors.password_confirmation}
                        />
                        <Button
                            type="submit"
                            label="Create account"
                            variant="primary"
                            size="lg"
                            isLoading={processing}
                        />
                        <Text
                            color="secondary"
                            display="block"
                            justify="center"
                        >
                            Already have an account?{' '}
                            <Link href={login().url}>Log in</Link>
                        </Text>
                    </VStack>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
