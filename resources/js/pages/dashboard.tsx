import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Skeleton } from '@astryxdesign/core/Skeleton';
import { Heading, Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

const tiles = ['Revenue', 'Active users', 'Open issues'];

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <VStack gap={4}>
                <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
                    {tiles.map((title, index) => (
                        <Card key={title}>
                            <VStack gap={3}>
                                <Text color="secondary">{title}</Text>
                                <Skeleton
                                    height={32}
                                    width="60%"
                                    index={index}
                                />
                                <Skeleton height={96} index={index} />
                            </VStack>
                        </Card>
                    ))}
                </Grid>
                <Card minHeight={420}>
                    <VStack gap={4}>
                        <Heading level={3}>Activity</Heading>
                        {Array.from({ length: 6 }, (_, i) => (
                            <Skeleton key={i} height={20} index={i} />
                        ))}
                    </VStack>
                </Card>
            </VStack>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
