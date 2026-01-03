"use client";
import { use, useState } from "react";
import { Box, Button, Label, IconButton } from "@primer/react";
import { AlertIcon, ArrowDownIcon, ChecklistIcon, ChevronDownIcon, ChevronUpIcon, CopilotIcon, CopyIcon, UnfoldIcon } from "@primer/octicons-react";
import { AlertHeader } from "@/components/alerts/AlertHeader";
import { AlertDetailLayout } from "@/components/alerts/AlertDetailLayout";
import { DismissAlertModal, DismissalReason } from "@/components/alerts/DismissAlertModal";
import { Severity } from "@/components/alerts/fields/Severity";
import { Assignees } from "@/components/alerts/fields/Assignees";
import { Tags } from "@/components/alerts/fields/Tags";
import { SecurityCampaigns } from "@/components/alerts/fields/SecurityCampaigns";
import { Development } from "@/components/alerts/fields/Development";
import { AffectedBranches } from "@/components/alerts/fields/AffectedBranches";
import { DescriptionBox } from "@/components/alerts/content/DescriptionBox";
import codeScanningData from "@/mockData/code-scanning.json";
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
                leftContent={
                    <DescriptionBox
                        sections={[
                            {
                                leadingVisual: <AlertIcon />,
                                title: "Code Vulnerability Found",
                                content: (
                                    <div>
                                        <div className={styles.ruleInfo}>
                                            <div className={styles.ruleRow}>
                                                <div className={styles.ruleColumn}>
                                                    <span className={styles.ruleLabel}>Tool</span>
                                                    <span className={styles.ruleValue}>CodeQL</span>
                                                </div>
                                                <div className={styles.ruleColumn}>
                                                    <span className={styles.ruleLabel}>Rule ID</span>
                                                    <span className={styles.ruleValue}>
                                                        <span className={styles.ruleId}>cpp/dangerous-function-overflow</span>
                                                    </span>
                                                </div>
                                                <div className={styles.ruleColumn}>
                                                    <span className={styles.ruleLabel}>Query</span>
                                                    <span className={styles.ruleValue}>
                                                        <a href="#" className={styles.viewSourceLink}>View source</a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={styles.descriptionText}>
                                            This rule finds calls to the gets function, which is dangerous and should not be used. See Related rules below for rules that identify other dangerous functions.
                                        </p>
                                        <Button size="small" trailingVisual={ArrowDownIcon}>
                                            Show more
                                        </Button>
                                    </div>
                                )
                            },
                            {
                                leadingVisual: <ChecklistIcon />,
                                title: "Remediating this alert",
                                content: (
                                    <div>
                                        <div className={styles.autofixHeader}>
                                            <span className={styles.copilotBadge}>
                                                <CopilotIcon className={styles.copilotIcon} />
                                                <span className={styles.copilotText}>Copilot Autofix</span>
                                            </span>
                                            <Label>AI</Label>
                                            <span className={styles.generatedText}>generated 3 months ago</span>
                                        </div>
                                        <p className={styles.remediationText}>
                                            The best way to fix the problem is to replace the call to gets(buff); with a safer alternative that guards against buffer overflows, specifically fgets. The fgets function allows specification of the buffer size, thus preventing overflow. Since the parameter is char buff[128], we will use fgets(buff, 128, stdin);. No additional headers are necessary, as fgets is part of the C standard library (already in the prototype scope). The functionality does not require any changes otherwise, so only a one-line replacement is needed for line 29 in test.cpp. (If you want to match the behavior of gets exactly in terms of \n handling, post-processing may be required, but for the sake of this fix and to avoid adding new code unless necessary, we simply make the switch to fgets.)
                                        </p>
                                        <div className={styles.diffViewer}>
                                            <div className={styles.diffHeader}>
                                                <div className={styles.diffHeaderLeft}>
                                                    <span className={styles.diffFileName}>test.cpp</span>
                                                    <IconButton icon={CopyIcon} variant="invisible" size="small" aria-label="Copy" />
                                                    <Label>Autofix</Label>
                                                </div>
                                                <IconButton icon={UnfoldIcon} variant="invisible" size="small" aria-label="Expand" />
                                            </div>
                                            <div className={styles.diffExpandRowTop}>
                                                <div className={styles.expandIconColumn}>
                                                    <IconButton icon={ChevronUpIcon} variant="invisible" size="small" aria-label="Expand up" />
                                                </div>
                                                <div className={styles.expandTextColumn}>
                                                    @@ -11,3 +11,4 @@
                                                </div>
                                            </div>
                                            <div className={styles.diffContent}>
                                                <div className={styles.diffLine}>
                                                    <span className={styles.diffLineNumbers}>11</span>
                                                    <span className={styles.diffLineContent}>    void func(char bugg[128], unsigned long</span>
                                                </div>
                                                <div className={styles.diffLine}>
                                                    <span className={styles.diffLineNumbers}></span>
                                                    <span className={styles.diffLineContent}>    long sz) {'{'}</span>
                                                </div>
                                                <div className={`${styles.diffLine} ${styles.diffLineRemoved}`}>
                                                    <span className={styles.diffLineNumbers}>12</span>
                                                    <span className={styles.diffLineContent}>-       gets(buff);</span>
                                                </div>
                                                <div className={`${styles.diffLine} ${styles.diffLineAdded}`}>
                                                    <span className={styles.diffLineNumbers}>12</span>
                                                    <span className={styles.diffLineContent}>+       gets(buff, 128, stdin);</span>
                                                </div>
                                                <div className={styles.diffLine}>
                                                    <span className={styles.diffLineNumbers}>13</span>
                                                    <span className={styles.diffLineContent}>    memset(buff, 0, PW_SIZE); // GOOD</span>
                                                </div>
                                                <div className={styles.diffLine}>
                                                    <span className={styles.diffLineNumbers}>14</span>
                                                    <span className={styles.diffLineContent}>    {'}'}</span>
                                                </div>
                                            </div>
                                            <div className={styles.diffExpandRowBottom}>
                                                <div className={styles.expandIconColumn}>
                                                    <IconButton icon={ChevronDownIcon} variant="invisible" size="small" aria-label="Expand down" />
                                                </div>
                                                <div className={styles.expandTextColumn}></div>
                                            </div>
                                            <div className={styles.diffFooter}>
                                                Copilot Autofix for CodeQL is powered by AI and may make mistakes. Always verify output.
                                            </div>
                                        </div>
                                        <div className={styles.buttonContainer}>
                                            <Button variant="primary">
                                                Commit to a new branch
                                            </Button>
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
