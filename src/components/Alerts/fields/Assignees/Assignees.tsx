import { useState } from "react";
import { ActionList, AnchoredOverlay, Text } from "@primer/react";
import { GearIcon, CopilotIcon } from "@primer/octicons-react";
import { AlertMetadataField } from "@/components/alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/alerts/AlertMetadataFieldTitle";
import { AlertMetadataFieldContent } from "@/components/alerts/AlertMetadataFieldContent";
import { AssigneesOverlay } from "@/components/alerts/AssigneesOverlay";
import styles from "./Assignees.module.css";

export interface Assignee {
    id: string;
    login: string;
    name: string;
    type: "user" | "bot";
}

export interface AssigneesProps {
    groupAssignees?: Assignee[];
    suggestions?: Assignee[];
    onAssigneeToggle?: (id: string, selected: boolean) => void;
}

export function Assignees({
    groupAssignees = [],
    suggestions = [],
    onAssigneeToggle
}: AssigneesProps) {
    const [isAssigneesOpen, setIsAssigneesOpen] = useState(false);

    return (
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
                    groupAssignees={groupAssignees}
                    suggestions={suggestions}
                    onAssigneeToggle={onAssigneeToggle}
                />
            </AnchoredOverlay>

            {/* Don't need the AlertMetadataFieldContent component because the field content here 
            will use ActionList.Item components which have spacing built in */}
            <div className={styles.AssigneesList}>
                <ActionList.Item>
                    <ActionList.LeadingVisual>
                        <div className={styles.CopilotIconContainer}>
                            <CopilotIcon size={16} className={styles.CopilotIconOverride} />
                        </div>
                    </ActionList.LeadingVisual>
                    <Text className={styles.AssigneeText}>Copilot</Text>
                </ActionList.Item>
            </div>

        </AlertMetadataField>
    );
}
