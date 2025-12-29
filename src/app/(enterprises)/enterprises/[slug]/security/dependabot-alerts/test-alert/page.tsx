"use client";
import { use, useState } from "react";
import { Box, Button } from "@primer/react";
import { AlertHeader } from "@/components/Alerts/AlertHeader";
import { DismissAlertModal } from "@/components/DismissAlertModal";
import dependabotData from "@/mockData/dependabot.json";

export default function DependabotAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug, id } = use(params);
    const alertData = dependabotData[0]; // Using first alert for prototype
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = `${alertData.dependency.package.name} (${alertData.dependency.package.ecosystem})`;
    const fileName = alertData.dependency.manifest_path;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' • ');
    const title = alertData.security_advisory?.summary || 'Dependency Alert';

    const handleDismiss = (reason: string, comment: string) => {
        console.log('Dismissing alert:', { reason, comment });
        // Handle dismissal logic here
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <AlertHeader
                alertStatus={alertData.state as "open" | "dismissed" | "fixed"}
                title={title}
                subtitleContent={subtitle}
                timestamp={alertData.created_at}
                buttonGroup={
                    <Button onClick={() => setIsModalOpen(true)}>Dismiss alert</Button>
                }
            />
            <DismissAlertModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDismiss={handleDismiss}
            />
        </Box>
    );
}
