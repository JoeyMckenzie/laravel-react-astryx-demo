import { Card } from '@astryxdesign/core/Card';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { List } from '@astryxdesign/core/List';
import { router } from '@inertiajs/react';
import { KeyRound } from 'lucide-react';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';
import PageSection from '@/components/page-section';
import PasskeyItem from '@/components/passkey-item';
import PasskeyRegistration from '@/components/passkey-register';
import type { Passkey } from '@/types/auth';

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: Passkey[];
};

export default function ManagePasskeys(props: Props) {
    const passkeys = props.passkeys ?? [];

    if (!(props.canManagePasskeys ?? false)) {
        return null;
    }

    const handleDelete = (id: number, onError: () => void) => {
        router.delete(destroy.url(id), { preserveScroll: true, onError });
    };

    return (
        <PageSection
            title="Passkeys"
            description="Manage your passkeys for passwordless sign-in"
        >
            <Card padding={passkeys.length > 0 ? 2 : 4}>
                {passkeys.length > 0 ? (
                    <List hasDividers>
                        {passkeys.map((passkey) => (
                            <PasskeyItem
                                key={passkey.id}
                                passkey={passkey}
                                onDelete={handleDelete}
                            />
                        ))}
                    </List>
                ) : (
                    <EmptyState
                        isCompact
                        icon={<KeyRound size={28} />}
                        title="No passkeys yet"
                        description="Add a passkey to sign in without a password"
                    />
                )}
            </Card>

            <PasskeyRegistration onSuccess={() => router.reload()} />
        </PageSection>
    );
}
