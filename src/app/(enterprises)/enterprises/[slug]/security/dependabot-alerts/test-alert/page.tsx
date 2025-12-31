"use client";
import { use, useState } from "react";
import { Box, Button } from "@primer/react";
import { InfoIcon } from "@primer/octicons-react";
import { AlertHeader } from "@/components/alerts/AlertHeader";
import { AlertDetailLayout } from "@/components/alerts/AlertDetailLayout";
import { AlertMetadataField } from "@/components/alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/alerts/AlertMetadataFieldTitle";
import { AlertMetadataFieldContent } from "@/components/alerts/AlertMetadataFieldContent";
import { DismissAlertModal, DismissalReason } from "@/components/alerts/DismissAlertModal";
import { Severity } from "@/components/alerts/fields/Severity";
import { Tags } from "@/components/alerts/fields/Tags";
import { DescriptionBox } from "@/components/alerts/content/DescriptionBox";
import dependabotData from "@/mockData/dependabot.json";

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

const DEPENDABOT_DISMISSAL_REASONS: DismissalReason[] = [
    {
        value: "fix-started",
        label: "A fix has already been started",
    },
    {
        value: "no-bandwidth",
        label: "No bandwidth to fix this",
    },
    {
        value: "tolerable-risk",
        label: "Risk is tolerable to this project",
    },
    {
        value: "inaccurate",
        label: "This alert is inaccurate or incorrect",
    },
    {
        value: "not-used",
        label: "Vulnerable code is not actually used",
    },
];

export default function DependabotAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug: _slug, id: _id } = use(params);
    const alertData = dependabotData[0]; // Using first alert for prototype
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = `${alertData.dependency.package.name} (${alertData.dependency.package.ecosystem})`;
    const fileName = alertData.dependency.manifest_path;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' ');
    const title = alertData.security_advisory?.summary || 'Dependency Alert';

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
                                leadingVisual: <InfoIcon />,
                                title: "Alert description title",
                                caption: "Text",
                                trailingContent: <InfoIcon />,
                                content: <div style={{ padding: '64px', backgroundColor: 'var(--bgColor-accent-muted)', color: 'var(--fgColor-accent)', textAlign: 'center', borderRadius: '6px' }}>Placeholder slot</div>
                            },
                            {
                                leadingVisual: <InfoIcon />,
                                title: "Remediating this alert",
                                caption: "Text",
                                trailingContent: <InfoIcon />,
                                content: <div style={{ padding: '64px', backgroundColor: 'var(--bgColor-accent-muted)', color: 'var(--fgColor-accent)', textAlign: 'center', borderRadius: '6px' }}>Placeholder slot</div>
                            }
                        ]}
                    />
                }
                rightContent={
                    <div>
                        <Severity severity="Critical" />
                        <AlertMetadataField showDivider={true}>
                            <AlertMetadataFieldTitle title="CVE ID" />
                            <AlertMetadataFieldContent>
                                <div>CVE-xxxx-xxxxxx</div>
                            </AlertMetadataFieldContent>
                        </AlertMetadataField>
                        <AlertMetadataField showDivider={true}>
                            <AlertMetadataFieldTitle title="GHSA ID" />
                            <AlertMetadataFieldContent>
                                <div>GHSA-xxxx-xxxx</div>
                            </AlertMetadataFieldContent>
                        </AlertMetadataField>
                        <AlertMetadataField showDivider={true}>
                            <AlertMetadataFieldTitle title="EPSS score" />
                            <AlertMetadataFieldContent>
                                <div>94.436% (100th percentile)</div>
                            </AlertMetadataFieldContent>
                        </AlertMetadataField>
                        <Tags />
                    </div>
                }
            />
            <DismissAlertModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDismiss={handleDismiss}
                dismissalReasons={DEPENDABOT_DISMISSAL_REASONS}
            />
        </Box>
    );
}
