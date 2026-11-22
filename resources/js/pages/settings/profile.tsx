import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head, router, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import FormTextInput from '@/components/form-text-input';
import PageSection from '@/components/page-section';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Profile settings" />

            <PageSection
                title="Profile"
                description="Update your name and email address"
            >
                <Form
                    {...ProfileController.update.form()}
                    options={{ preserveScroll: true }}
                >
                    {({ processing, errors }) => (
                        <VStack gap={4}>
                            <FormTextInput
                                name="name"
                                label="Name"
                                defaultValue={auth.user.name}
                                isRequired
                                autoComplete="name"
                                placeholder="Full name"
                                error={errors.name}
                            />
                            <FormTextInput
                                name="email"
                                label="Email address"
                                type="email"
                                defaultValue={auth.user.email}
                                isRequired
                                autoComplete="username"
                                placeholder="Email address"
                                error={errors.email}
                            />

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <Text color="secondary">
                                        Your email address is unverified.{' '}
                                        <Link
                                            onClick={() =>
                                                router.post(send().url)
                                            }
                                        >
                                            Click here to re-send the
                                            verification email.
                                        </Link>
                                    </Text>
                                )}
                            {status === 'verification-link-sent' && (
                                <Banner
                                    status="success"
                                    title="A new verification link has been sent to your email address."
                                />
                            )}

                            <HStack>
                                <Button
                                    type="submit"
                                    label="Save"
                                    variant="primary"
                                    isLoading={processing}
                                    data-test="update-profile-button"
                                />
                            </HStack>
                        </VStack>
                    )}
                </Form>
            </PageSection>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [{ title: 'Profile settings', href: edit() }],
};
