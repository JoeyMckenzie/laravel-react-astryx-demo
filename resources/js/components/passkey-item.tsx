import { AlertDialog } from '@astryxdesign/core/AlertDialog';
import { IconButton } from '@astryxdesign/core/IconButton';
import { ListItem } from '@astryxdesign/core/List';
import { NavIcon } from '@astryxdesign/core/NavIcon';
import { Token } from '@astryxdesign/core/Token';
import { KeyRound, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Passkey } from '@/types/auth';

type Props = {
    passkey: Passkey;
    onDelete: (id: number, onError: () => void) => void;
};

export default function PasskeyItem({ passkey, onDelete }: Props) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const usage = [
        `Added ${passkey.created_at_diff}`,
        passkey.last_used_at_diff && `Last used ${passkey.last_used_at_diff}`,
    ]
        .filter(Boolean)
        .join(' · ');

    return (
        <>
            <ListItem
                label={passkey.name}
                description={usage}
                startContent={<NavIcon icon={<KeyRound size={16} />} />}
                endContent={
                    <>
                        {passkey.authenticator && (
                            <Token label={passkey.authenticator} size="sm" />
                        )}
                        <IconButton
                            label="Remove"
                            variant="ghost"
                            icon={<Trash2 size={16} />}
                            onClick={() => setIsConfirmOpen(true)}
                        />
                    </>
                }
            />
            <AlertDialog
                isOpen={isConfirmOpen}
                onOpenChange={setIsConfirmOpen}
                title="Remove passkey"
                description={`Are you sure you want to remove the "${passkey.name}" passkey? You will no longer be able to use it to sign in.`}
                actionLabel="Remove passkey"
                isActionLoading={isDeleting}
                onAction={() => {
                    setIsDeleting(true);
                    onDelete(passkey.id, () => setIsDeleting(false));
                }}
            />
        </>
    );
}
