import {
    SegmentedControl,
    SegmentedControlItem,
} from '@astryxdesign/core/SegmentedControl';
import { HStack } from '@astryxdesign/core/HStack';
import { Head } from '@inertiajs/react';
import { Monitor, Moon, Sun } from 'lucide-react';
import PageSection from '@/components/page-section';
import type { Appearance as AppearanceMode } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="Appearance settings" />

            <PageSection
                title="Appearance settings"
                description="Update the appearance settings for your account"
            >
                <HStack>
                    <SegmentedControl
                        label="Color mode"
                        value={appearance}
                        onChange={(value) =>
                            updateAppearance(value as AppearanceMode)
                        }
                    >
                        <SegmentedControlItem
                            value="light"
                            label="Light"
                            icon={<Sun size={16} />}
                        />
                        <SegmentedControlItem
                            value="dark"
                            label="Dark"
                            icon={<Moon size={16} />}
                        />
                        <SegmentedControlItem
                            value="system"
                            label="System"
                            icon={<Monitor size={16} />}
                        />
                    </SegmentedControl>
                </HStack>
            </PageSection>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [{ title: 'Appearance settings', href: editAppearance() }],
};
