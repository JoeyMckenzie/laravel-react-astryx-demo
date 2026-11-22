import { Button } from '@astryxdesign/core/Button';
import { HStack } from '@astryxdesign/core/HStack';
import { VStack } from '@astryxdesign/core/VStack';
import { Form, Head } from '@inertiajs/react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import FormTextInput from '@/components/form-text-input';
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys';
import ManagePasskeys from '@/components/manage-passkeys';
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor';
import ManageTwoFactor from '@/components/manage-two-factor';
import PageSection from '@/components/page-section';
import { edit } from '@/routes/security';

type Props = ManagePasskeysProps & ManageTwoFactorProps;

export default function Security(props: Props) {
    return (
        <>
            <Head title="Security settings" />

            <PageSection
                title="Update password"
                description="Ensure your account is using a long, random password to stay secure"
            >
                <Form
                    {...SecurityController.update.form()}
                    options={{ preserveScroll: true }}
                    resetOnError={[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]}
                    resetOnSuccess
                >
                    {({ errors, processing }) => (
                        <VStack gap={4}>
                            <FormTextInput
                                name="current_password"
                                label="Current password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Current password"
                                error={errors.current_password}
                            />
                            <FormTextInput
                                name="password"
                                label="New password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="New password"
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
                            <HStack>
                                <Button
                                    type="submit"
                                    label="Save"
                                    variant="primary"
                                    isLoading={processing}
                                    data-test="update-password-button"
                                />
                            </HStack>
                        </VStack>
                    )}
                </Form>
            </PageSection>

            <ManageTwoFactor
                canManageTwoFactor={props.canManageTwoFactor}
                requiresConfirmation={props.requiresConfirmation}
                twoFactorEnabled={props.twoFactorEnabled}
            />

            <ManagePasskeys
                canManagePasskeys={props.canManagePasskeys}
                passkeys={props.passkeys}
            />
        </>
    );
}

Security.layout = {
    breadcrumbs: [{ title: 'Security settings', href: edit() }],
};
