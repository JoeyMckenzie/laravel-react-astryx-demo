import { Heading, Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import type { ReactNode } from 'react';

/** A titled settings section: replaces the old Tailwind `Heading` component. */
export default function PageSection({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: ReactNode;
}) {
    return (
        <VStack gap={4} as="section">
            <VStack gap={1}>
                <Heading level={3}>{title}</Heading>
                {description && <Text color="secondary">{description}</Text>}
            </VStack>
            {children}
        </VStack>
    );
}
