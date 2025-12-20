"use client";
import { use, ReactNode } from "react";
import { Box } from "@primer/react";
import { AlertHeader } from "@/components/Alerts/AlertHeader";
import codeScanningData from "@/mockData/code-scanning.json";

export default function CodeScanningAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug, id } = use(params);
    const alertData = codeScanningData[0]; // Using first alert for prototype

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = `${alertData.tool.name} v${alertData.tool.version}`;
    const fileName = alertData.most_recent_instance.location.path;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' • ');
    const title = alertData.rule.description;

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
