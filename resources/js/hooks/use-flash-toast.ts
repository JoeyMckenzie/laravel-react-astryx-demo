import { useToast } from '@astryxdesign/core/Toast';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import type { FlashToast } from '@/types/ui';

export function useFlashToast(): void {
    const toast = useToast();

    useEffect(() => {
        return router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;
            const data = flash?.toast as FlashToast | undefined;

            if (!data) {
                return;
            }

            toast({
                body: data.message,
                type: data.type === 'error' ? 'error' : 'info',
            });
        });
    }, [toast]);
}
