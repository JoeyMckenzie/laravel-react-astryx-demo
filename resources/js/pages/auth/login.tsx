import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput';
import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import FormTextInput from '@/components/form-text-input';
import PasskeyVerify from '@/components/passkey-verify';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const [remember, setRemember] = useState(false);

    return (
        <>
            <Head title="Log in" />

            {status && <Banner status="success" title={status} />}

            <PasskeyVerify />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <VStack gap={4}>
                        <FormTextInput
                            name="email"
                            label="Email address"
                            type="email"
                            isRequired
                            hasAutoFocus
                            autoComplete="email"
                            placeholder="email@example.com"
                            error={errors.email}
                        />
                        <VStack gap={1}>
                            <FormTextInput
                                name="password"
                                label="Password"
                                type="password"
                                isRequired
                                autoComplete="current-password"
                                placeholder="Password"
                                error={errors.password}
                            />
                            {canResetPassword && (
                                <HStack hAlign="end">
                                    <Link
                                        href={request().url}
                                        type="supporting"
                                    >
                                        Forgot your password?
                                    </Link>
                                </HStack>
                            )}
                        </VStack>
                        <CheckboxInput
                            label="Remember me"
                            htmlName="remember"
                            value={remember}
                            onChange={setRemember}
                        />
                        <Button
                            type="submit"
                            label="Log in"
                            variant="primary"
                            size="lg"
                            isLoading={processing}
                        />
                        <Text
                            color="secondary"
                            display="block"
                            justify="center"
                        >
                            Don't have an account?{' '}
                            <Link href={register().url}>Sign up</Link>
                        </Text>
                    </VStack>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
