"use client";
import { use, ReactNode } from "react";
import { Box } from "@primer/react";
import { AlertHeader } from "@/components/Alerts/AlertHeader";
import secretScanningData from "@/mockData/secret-scanning.json";

export default function SecretScanningAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug, id } = use(params);
    const alertData = secretScanningData[0]; // Using first alert for prototype

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = alertData.validity ? `Validity: ${alertData.validity}` : 'Secret detected';
    const fileName = alertData.secret;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' • ');
    const title = alertData.secret_type_display_name;

    const buttonGroup: ReactNode = (
        <button>Dismiss alert</button>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <AlertHeader
                alertStatus={alertData.state as "open" | "dismissed" | "fixed"}
                title={title}
                subtitleContent={subtitle}
                timestamp={alertData.created_at}
                buttonGroup={buttonGroup}
            />
        </Box>
    );
}
