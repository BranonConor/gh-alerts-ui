"use client";
import { use, useState } from "react";
import { Box, Button, ActionList, AnchoredOverlay } from "@primer/react";
import { GearIcon } from "@primer/octicons-react";
import { AlertHeader } from "@/components/Alerts/AlertHeader";
import { AlertDetailLayout } from "@/components/Alerts/AlertDetailLayout";
import { AlertMetadataField } from "@/components/Alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/Alerts/AlertMetadataFieldTitle";
import { DismissAlertModal, DismissalReason } from "@/components/Alerts/DismissAlertModal";
import { AssigneesOverlay } from "@/components/Alerts/AssigneesOverlay";
import secretScanningData from "@/mockData/secret-scanning.json";

const MOCK_GROUP_ASSIGNEES = [
    {
        id: "copilot",
        login: "Copilot",
        name: "Your AI pair programmer",
        type: "bot" as const,
    },
];

const MOCK_SUGGESTIONS = [
    {
        id: "branonconor",
        login: "BranonConor",
        name: "Branon Eusebio",
        type: "user" as const,
    },
    {
        id: "2ley",
        login: "2ley",
        name: "Eric Tooley",
        type: "user" as const,
    },
    {
        id: "a-s100",
        login: "a-s100",
        name: "",
        type: "user" as const,
    },
    {
        id: "a-schur",
        login: "a-schur",
        name: "",
        type: "user" as const,
    },
    {
        id: "aaroncathcart",
        login: "aaroncathcart",
        name: "Aaron Cathcart",
        type: "user" as const,
    },
    {
        id: "aaronwaggener",
        login: "aaronwaggener",
        name: "Aaron Waggener",
        type: "user" as const,
    },
    {
        id: "aashah",
        login: "aashah",
        name: "Aakash Shah",
        type: "user" as const,
    },
];

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
    const [isAssigneesOpen, setIsAssigneesOpen] = useState(false);

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = alertData.validity ? `Validity: ${alertData.validity}` : 'Secret detected';
    const fileName = alertData.secret;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' ');
    const title = alertData.secret_type_display_name;

    const handleDismiss = (reason: string, comment: string) => {
        const message = comment
            ? `Dismissal Reason: ${reason}\n\nComment: ${comment}`
            : `Dismissal Reason: ${reason}`;
        alert(message);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}>
            <AlertHeader
                alertStatus={alertData.state as "open" | "dismissed" | "fixed"}
                title={title}
                subtitleContent={subtitle}
                timestamp={alertData.created_at}
                buttonGroup={
                    <Button onClick={() => setIsModalOpen(true)}>Dismiss alert</Button>
                }
            />
            <AlertDetailLayout
                leftContent={<div>Left panel content - Main alert details</div>}
                rightContent={
                    <ActionList>
                        <AlertMetadataField showDivider={true}>
                            <AlertMetadataFieldTitle title="Severity" />
                            <div style={{ backgroundColor: 'var(--bgColor-muted)', borderRadius: '6px', flexGrow: 1, margin: '0 8px', height: '20px' }} />
                        </AlertMetadataField>
                        <AlertMetadataField showDivider={true}>
                            <AnchoredOverlay
                                open={isAssigneesOpen}
                                onOpen={() => setIsAssigneesOpen(true)}
                                onClose={() => setIsAssigneesOpen(false)}
                                width="medium"
                                renderAnchor={(props) => (
                                    <AlertMetadataFieldTitle
                                        {...props}
                                        title="Assignees"
                                        isInteractive={true}
                                        trailingVisual={<GearIcon />}
                                        onClick={() => setIsAssigneesOpen(!isAssigneesOpen)}
                                    />
                                )}
                            >
                                <AssigneesOverlay
                                    groupAssignees={MOCK_GROUP_ASSIGNEES}
                                    suggestions={MOCK_SUGGESTIONS}
                                    onAssigneeToggle={(id, selected) => {
                                        console.log(`Assignee ${id} ${selected ? 'selected' : 'deselected'}`);
                                    }}
                                />
                            </AnchoredOverlay>
                            <div style={{ backgroundColor: 'var(--bgColor-muted)', borderRadius: '6px', flexGrow: 1, margin: '0 8px', height: '20px' }} />
                        </AlertMetadataField>
                        <AlertMetadataField showDivider={true}>
                            <AlertMetadataFieldTitle title="Placeholder Title" />
                            <div style={{ backgroundColor: 'var(--bgColor-muted)', borderRadius: '6px', flexGrow: 1, margin: '0 8px', height: '20px' }} />
                        </AlertMetadataField>
                    </ActionList>
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
