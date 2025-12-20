"use client";
import { use, ReactNode } from "react";
import { Box } from "@primer/react";
import { AlertHeader } from "@/components/Alerts/AlertHeader";
import dependabotData from "@/mockData/dependabot.json";

export default function DependabotAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug, id } = use(params);
    const alertData = dependabotData[0]; // Using first alert for prototype

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = `${alertData.dependency.package.name} (${alertData.dependency.package.ecosystem})`;
    const fileName = alertData.dependency.manifest_path;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' • ');
    const title = alertData.security_advisory?.summary || 'Dependency Alert';

    const buttonGroup: ReactNode = (
        <button 
            style={{ 
                padding: '5px 16px', 
                backgroundColor: '#f6f8fa',
                border: '1px solid rgba(31,35,40,0.15)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
            }}
            aria-label="Dismiss alert"
        >
            Dismiss alert
        </button>
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
