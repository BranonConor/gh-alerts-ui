"use client";
import { use, useState } from "react";
import { Box, Button } from "@primer/react";
import { AlertHeader } from "@/components/alerts/AlertHeader";
import { AlertDetailLayout } from "@/components/alerts/AlertDetailLayout";
import { AlertMetadataField } from "@/components/alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/alerts/AlertMetadataFieldTitle";
import { AlertMetadataFieldContent } from "@/components/alerts/AlertMetadataFieldContent";
import { DismissAlertModal, DismissalReason } from "@/components/alerts/DismissAlertModal";
import { Severity } from "@/components/alerts/fields/Severity";
import { Assignees } from "@/components/alerts/fields/Assignees";
import { Tags } from "@/components/alerts/fields/Tags";
import { SecurityCampaigns } from "@/components/alerts/fields/SecurityCampaigns";
import { Development } from "@/components/alerts/fields/Development";
import { AffectedBranches } from "@/components/alerts/fields/AffectedBranches";
import codeScanningData from "@/mockData/code-scanning.json";

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

const MOCK_LINKED_PRS = [
    {
        id: "pr-64",
        number: 64,
        title: "Replace unsafe gets() with fgets()",
        state: "draft" as const,
    },
];

const MOCK_PR_SUGGESTIONS = [
    {
        id: "pr-61",
        number: 61,
        title: "Replace unsafe gets() in test.cpp for improved security",
        state: "draft" as const,
    },
    {
        id: "pr-63",
        number: 63,
        title: "Replace unsafe gets() with fgets() in test.cpp",
        state: "draft" as const,
    },
    {
        id: "pr-15",
        number: 15,
        title: "Potential fix for code scanning alert no. 15: Use of dangerous function",
        state: "draft" as const,
    },
];

const CODE_SCANNING_DISMISSAL_REASONS: DismissalReason[] = [
    {
        value: "false-positive",
        label: "False positive",
        caption: "This alert is not valid",
    },
    {
        value: "used-in-tests",
        label: "Used in tests",
        caption: "This alert is not in production code",
    },
    {
        value: "wont-fix",
        label: "Won't fix",
        caption: "This alert is not relevant",
    },
];

export default function CodeScanningAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug: _slug, id: _id } = use(params);
    const alertData = codeScanningData[0]; // Using first alert for prototype
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Build subtitle the same way as AlertsTableItem
    const detectedIn = `${alertData.tool.name} v${alertData.tool.version}`;
    const fileName = alertData.most_recent_instance.location.path;
    const subtitle = [detectedIn, fileName].filter(Boolean).join(' ');
    const title = alertData.rule.description;

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
                    <div>
                        <Severity severity="Critical" />
                        <Assignees
                            groupAssignees={MOCK_GROUP_ASSIGNEES}
                            suggestions={MOCK_SUGGESTIONS}
                            onAssigneeToggle={(id, selected) => {
                                console.log(`Assignee ${id} ${selected ? 'selected' : 'deselected'}`);
                            }}
                        />
                        <AffectedBranches />
                        <Development
                            linkedPullRequests={MOCK_LINKED_PRS}
                            suggestions={MOCK_PR_SUGGESTIONS}
                            onPullRequestToggle={(prId, selected) => {
                                console.log(`PR ${prId} ${selected ? 'linked' : 'unlinked'}`);
                            }}
                        />
                        <SecurityCampaigns />
                        <Tags />
                    </div>
                }
            />
            <DismissAlertModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDismiss={handleDismiss}
                dismissalReasons={CODE_SCANNING_DISMISSAL_REASONS}
            />
        </Box>
    );
}
