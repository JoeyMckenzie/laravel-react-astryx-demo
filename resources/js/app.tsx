import { createInertiaApp } from '@inertiajs/react';
import { LinkProvider } from '@astryxdesign/core/Link';
import { Theme } from '@astryxdesign/core/theme';
import { InertiaLink } from '@/components/inertia-link';
import { initializeTheme, useAppearance } from '@/hooks/use-appearance';
import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { defaultThemeSlug, themes } from '../../astryx-themes';

// StyleX dev CSS: Laravel renders the HTML shell, so Vite cannot inject it.
if (import.meta.env.DEV) {
    void import('virtual:stylex:runtime');
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function AppRoot({ children }: { children: React.ReactNode }) {
    const { appearance } = useAppearance();

    useFlashToast();

    return (
        <Theme theme={themes[defaultThemeSlug]} mode={appearance}>
            <LinkProvider component={InertiaLink}>{children}</LinkProvider>
        </Theme>
    );
}

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return <AppRoot>{app}</AppRoot>;
    },
    progress: {
        color: '#4B5563',
    },
});

// Load the saved light / dark / system preference before the first render.
initializeTheme();
