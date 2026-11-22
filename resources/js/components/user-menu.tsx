import { Avatar } from '@astryxdesign/core/Avatar';
import {
    DropdownMenu,
    DropdownMenuDivider,
    DropdownMenuItem,
} from '@astryxdesign/core/DropdownMenu';
import { router, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';

export function UserMenu() {
    const { auth } = usePage().props;

    if (!auth.user) {
        return null;
    }

    return (
        <DropdownMenu
            button={{
                label: auth.user.name,
                variant: 'ghost',
                width: '100%',
                icon: (
                    <Avatar
                        size="sm"
                        name={auth.user.name}
                        src={auth.user.avatar}
                        tooltip={false}
                    />
                ),
            }}
            placement="above"
            menuWidth={224}
        >
            <DropdownMenuItem
                label={auth.user.name}
                description={auth.user.email}
                isDisabled
            />
            <DropdownMenuDivider />
            <DropdownMenuItem
                label="Settings"
                icon={Settings}
                href={edit().url}
            />
            <DropdownMenuItem
                label="Log out"
                icon={LogOut}
                onClick={() => {
                    router.flushAll();
                    router.post(logout().url);
                }}
            />
        </DropdownMenu>
    );
}
