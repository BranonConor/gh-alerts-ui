"use client";
import { use, useState } from "react";
import { Box, Button, IconButton } from "@primer/react";
import { AlertIcon, ChecklistIcon, CopyIcon, DependabotIcon } from "@primer/octicons-react";
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
                                leadingVisual: <AlertIcon />,
                                title: "Package Vulnerability Found",
                                content: (
                                    <div>
                                        <div className={styles.packageInfo}>
                                            <div className={styles.packageRow}>
                                                <div className={styles.packageColumn}>
                                                    <span className={styles.packageLabel}>Package</span>
                                                    <span className={styles.packageValue}>
                                                        <span className={styles.packageName}>org.apache.activemq:activemq-client</span>{' '}
                                                        <span className={styles.ecosystem}>(Maven)</span>
                                                    </span>
                                                </div>
                                                <div className={styles.packageColumn}>
                                                    <span className={styles.packageLabel}>Affected versions</span>
                                                    <span className={styles.packageValue}>
                                                        <span className={styles.versionText}>&lt; 5.15.16</span>
                                                    </span>
                                                </div>
                                                <div className={styles.packageColumn}>
                                                    <span className={styles.packageLabel}>Patched versions</span>
                                                    <span className={styles.packageValue}>
                                                        <span className={styles.versionText}>5.15.16</span>
                                                        <CopyIcon className={styles.copyButton} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={styles.descriptionText}>
                                            Apache ActiveMQ is vulnerable to Remote Code Execution. The vulnerability may allow a remote attacker with network access to a broker to run arbitrary shell commands by manipulating serialized class types in the OpenWire protocol to cause the broker to instantiate any class on the classpath.
                                        </p>
                                        <p className={styles.descriptionText}>
                                            Users are recommended to upgrade to version 5.15.6, 5.16.7, or 5.18.3, which fixes the issue.
                                        </p>
                                    </div>
                                )
                            },
                            {
                                leadingVisual: <ChecklistIcon />,
                                title: "Remediating this alert",
                                content: (
                                    <div className={styles.remediationContent}>
                                        <p className={styles.remediationText}>
                                            Upgrading <code>org.apache.activemq:activemq-client</code> will <a href="#" className={styles.remediationLink}>fix 7 Dependabot alerts</a> in <a href="#" className={styles.remediationLink}>assembly/src/release/examples/openwire/java/pom.xml</a>
                                        </p>
                                        <div className={styles.codeBlock}>
                                            <div>&lt;<span className={styles.xmlTag}>dependency</span>&gt;</div>
                                            <div>&nbsp;&nbsp;&lt;<span className={styles.xmlTag}>groupId</span>&gt;<span className={styles.xmlContent}>org.apache.activemq</span>&lt;/<span className={styles.xmlTag}>groupId</span>&gt;</div>
                                            <div>&nbsp;&nbsp;&lt;<span className={styles.xmlTag}>artifactId</span>&gt;<span className={styles.xmlContent}>activemq-client</span>&lt;/<span className={styles.xmlTag}>artifactId</span>&gt;</div>
                                            <div>&nbsp;&nbsp;&lt;<span className={styles.xmlTag}>version</span>&gt;<span className={styles.xmlContent}>[5.18.6,)</span>&lt;/<span className={styles.xmlTag}>version</span>&gt;</div>
                                            <div>&lt;/<span className={styles.xmlTag}>dependency</span>&gt;</div>
                                        </div>
                                        <div className={styles.buttonContainer}>
                                            <Button variant="primary" leadingVisual={DependabotIcon}>
                                                Create Dependabot security update
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
