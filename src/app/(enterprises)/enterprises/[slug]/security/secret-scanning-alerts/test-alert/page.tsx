"use client";
import { use, useState } from "react";
import { Box, Button, Text, IconButton } from "@primer/react";
import { AlertIcon, ChecklistIcon, SyncIcon, CopyIcon } from "@primer/octicons-react";
import { AlertHeader } from "@/components/alerts/AlertHeader";
import { AlertDetailLayout } from "@/components/alerts/AlertDetailLayout";
import { AlertMetadataField } from "@/components/alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/alerts/AlertMetadataFieldTitle";
import { AlertMetadataFieldContent } from "@/components/alerts/AlertMetadataFieldContent";
import { DismissAlertModal, DismissalReason } from "@/components/alerts/DismissAlertModal";
import { Severity } from "@/components/alerts/fields/Severity";
import { Assignees } from "@/components/alerts/fields/Assignees";
import { SecurityCampaigns } from "@/components/alerts/fields/SecurityCampaigns";
import { DescriptionBox } from "@/components/alerts/content/DescriptionBox";
import { LocationDisclosure } from "@/components/alerts/content/LocationDisclosure";
import secretScanningData from "@/mockData/secret-scanning.json";
import styles from "./page.module.css";

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
    const { slug: _slug, id: _id } = use(params);
    const alertData = secretScanningData[0]; // Using first alert for prototype
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                leftContent={
                    <DescriptionBox
                        sections={[
                            {
                                leadingVisual: <AlertIcon />,
                                title: "Secret Found",
                                caption: <Text sx={{ color: 'var(--fgColor-attention)', fontSize: 'var(--text-body-size-large)', fontWeight: 'var(--base-text-weight-semibold)' }}>Validity unknown</Text>,
                                trailingContent: (
                                    <div className={styles.trailingContainer}>
                                        <span className={styles.trailingText}>Last verified 2 days ago</span>
                                        <Button size="small" leadingVisual={SyncIcon}>Verify secret</Button>
                                    </div>
                                ),
                                content: (
                                    <div className={styles.secretContent}>
                                        <p>GitHub has notified MongoDB of the leak, but was unable to determine the status of the secret, which may still be active.</p>
                                        <div className={styles.secretContainer}>
                                            <span>sk-proj-11ABMFHEY0jn74J4mcOp2H_D4xZKd2vUPoFvVgVxMXmkV0FaqK0Kq16CzdfOxh</span>
                                            <IconButton aria-label="Copy secret" icon={CopyIcon} size="small" variant="invisible" />
                                        </div>
                                    </div>
                                )
                            },
                            {
                                leadingVisual: <ChecklistIcon />,
                                title: "Remediating this alert",
                                content: (
                                    <div className={styles.remediationContent}>
                                        <p>Follow the steps below before you close this alert.</p>
                                        <div className={styles.remediationList}>
                                            <div className={styles.remediationItem}>
                                                <span className={styles.numberCircle}>1</span>
                                                <span>If secret is in use, rotate the secret to prevent breaking workflows.</span>
                                            </div>
                                            <div className={styles.remediationItem}>
                                                <span className={styles.numberCircle}>2</span>
                                                <span>Revoke this <strong>MongoDB connection string</strong> through the provider to prevent unauthorized access. <a href="#">Learn more</a></span>
                                            </div>
                                            <div className={styles.remediationItem}>
                                                <span className={styles.numberCircle}>3</span>
                                                <span>Check security logs for potential breaches.</span>
                                            </div>
                                            <div className={styles.remediationItem}>
                                                <span className={styles.numberCircle}>4</span>
                                                <span>Close this alert as revoked.</span>
                                            </div>
                                        </div>
                                        <div className={styles.locationsSection}>
                                            <h4 className={styles.locationsHeader}>Locations Detected (1)</h4>
                                            <LocationDisclosure
                                                locationName="test-1"
                                                codeLines={[
                                                    { lineNumber: 12, content: 'KEY="jfdksaljfkdsla"' },
                                                    { lineNumber: 13, content: 'OTHER_KEY="sk-proj-11ABMFHEY0jn74J4mcOp2H_D4xZKd2vUPoFvVgVxMXmkV0FaqK0Kq16CzdfOxh"', isHighlighted: true },
                                                    { lineNumber: 14, content: 'ANOTHER_KEY="ghfdjsakgfhdsjagk"' }
                                                ]}
                                                commitHash="9e036e0"
                                                commitTime="10 minutes ago"
                                                avatarUrl="https://avatars.githubusercontent.com/u/1?v=4"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        ]}
                    />
                }
                rightContent={
                    <div>
                        <Severity severity="Critical" />
                        <AlertMetadataField showDivider={true}>
                            <AlertMetadataFieldTitle title="Secret type" />
                            <AlertMetadataFieldContent>
                                <div>generic_private_key</div>
                            </AlertMetadataFieldContent>
                        </AlertMetadataField>
                        <Assignees
                            groupAssignees={MOCK_GROUP_ASSIGNEES}
                            suggestions={MOCK_SUGGESTIONS}
                            onAssigneeToggle={(id, selected) => {
                                console.log(`Assignee ${id} ${selected ? 'selected' : 'deselected'}`);
                            }}
                        />
                        <SecurityCampaigns showDivider={false} />
                    </div>
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
