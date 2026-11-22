import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { HStack } from '@astryxdesign/core/HStack';
import { VStack } from '@astryxdesign/core/VStack';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import FormTextInput from '@/components/form-text-input';
import PageSection from '@/components/page-section';

export default function DeleteUser() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <PageSection
            title="Delete account"
            description="Delete your account and all of its resources"
        >
            <Banner
                status="error"
                title="Warning"
                description="Please proceed with caution, this cannot be undone."
                endContent={
                    <Button
                        label="Delete account"
                        variant="destructive"
                        data-test="delete-user-button"
                        onClick={() => setIsOpen(true)}
                    />
                }
            />

            <Dialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                purpose="form"
                width={480}
                padding={6}
            >
                <Form
                    {...ProfileController.destroy.form()}
                    options={{ preserveScroll: true }}
                    resetOnSuccess
                    onSuccess={() => setIsOpen(false)}
                >
                    {({ resetAndClearErrors, processing, errors }) => (
                        <VStack gap={4}>
                            <DialogHeader
                                title="Are you sure you want to delete your account?"
                                subtitle="Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."
                                hasDivider={false}
                            />
                            <FormTextInput
                                name="password"
                                label="Password"
                                isLabelHidden
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                error={errors.password}
                            />
                            <HStack gap={2} hAlign="end">
                                <Button
                                    label="Cancel"
                                    onClick={() => {
                                        resetAndClearErrors();
                                        setIsOpen(false);
                                    }}
                                />
                                <Button
                                    type="submit"
                                    label="Delete account"
                                    variant="destructive"
                                    isLoading={processing}
                                    data-test="confirm-delete-user-button"
                                />
                            </HStack>
                        </VStack>
                    )}
                </Form>
            </Dialog>
        </PageSection>
    );
}
