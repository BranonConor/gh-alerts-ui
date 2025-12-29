"use client";
import { use, useState } from "react";
import { Box, Button } from "@primer/react";
import { AlertHeader } from "@/components/Alerts/AlertHeader";
import { DismissAlertModal, DismissalReason } from "@/components/Alerts/DismissAlertModal";
import secretScanningData from "@/mockData/secret-scanning.json";

const SECRET_SCANNING_DISMISSAL_REASONS: DismissalReason[] = [
    {
        value: "revoked",
        label: "Revoked",
        caption: "This secret has been revoked",
    },
    {
        value: "used-in-tests",
        label: "Used in tests",
        caption: "This secret is not in production code",
    },
    {
        value: "false-positive",
        label: "False positive",
        caption: "This alert is not valid",
    },
    {
        value: "wont-fix",
        label: "Won't fix",
        caption: "This alert is not relevant",
    },
];

export default function SecretScanningAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug, id } = use(params);
    const alertData = secretScanningData[0]; // Using first alert for prototype
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = alertData.validity ? `Validity: ${alertData.validity}` : 'Secret detected';
    const fileName = alertData.secret;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' • ');
    const title = alertData.secret_type_display_name;

    const handleDismiss = (reason: string, comment: string) => {
        const message = comment
            ? `Dismissal Reason: ${reason}\n\nComment: ${comment}`
            : `Dismissal Reason: ${reason}`;
        alert(message);
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
                dismissalReasons={SECRET_SCANNING_DISMISSAL_REASONS}
            />
        </Box>
    );
}
