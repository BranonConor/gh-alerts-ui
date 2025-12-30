import { useState } from "react";
import { ActionList, TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";
import styles from "./AssigneesOverlay.module.css";

interface Assignee {
    id: string;
    login: string;
    name: string;
    type: "user" | "bot";
    avatar?: string;
}

interface AssigneesOverlayProps {
    groupAssignees?: Assignee[];
    suggestions?: Assignee[];
    onAssigneeToggle?: (assigneeId: string, selected: boolean) => void;
}

export const AssigneesOverlay = ({
    groupAssignees = [],
    suggestions = [],
    onAssigneeToggle
}: AssigneesOverlayProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAssignees, setSelectedAssignees] = useState<Set<string>>(
        new Set(groupAssignees.map(a => a.id))
    );

    const handleToggle = (assigneeId: string) => {
        const newSelected = new Set(selectedAssignees);
        const isSelected = newSelected.has(assigneeId);

        if (isSelected) {
            newSelected.delete(assigneeId);
        } else {
            newSelected.add(assigneeId);
        }

        setSelectedAssignees(newSelected);
        onAssigneeToggle?.(assigneeId, !isSelected);
    };

    const filterAssignees = (assignees: Assignee[]) => {
        if (!searchQuery) return assignees;
        const query = searchQuery.toLowerCase();
        return assignees.filter(
            a => a.login.toLowerCase().includes(query) ||
                a.name.toLowerCase().includes(query)
        );
    };

    const filteredGroupAssignees = filterAssignees(groupAssignees);
    const filteredSuggestions = filterAssignees(suggestions);

    return (
        <div className={styles.AssigneesOverlay}>
            <div className={styles.SearchContainer}>
                <TextInput
                    leadingVisual={SearchIcon}
                    placeholder="Filter assignees"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="small"
                    block
                />
            </div>
            <div className={styles.ScrollableContent}>
                <ActionList selectionVariant="multiple">
                    {filteredGroupAssignees.length > 0 && (
                        <>
                            <ActionList.Group>
                                <ActionList.GroupHeading as="h3">Group assignees</ActionList.GroupHeading>
                                {filteredGroupAssignees.map((assignee) => (
                                    <ActionList.Item
                                        key={assignee.id}
                                        selected={selectedAssignees.has(assignee.id)}
                                        onSelect={() => handleToggle(assignee.id)}
                                    >
                                        {assignee.login}
                                        <ActionList.Description>{assignee.name}</ActionList.Description>
                                        {assignee.type === "bot" && (
                                            <ActionList.TrailingVisual>
                                                <span className={styles.BotLabel}>bot</span>
                                            </ActionList.TrailingVisual>
                                        )}
                                    </ActionList.Item>
                                ))}
                            </ActionList.Group>
                        </>
                    )}
                    {filteredSuggestions.length > 0 && (
                        <>
                            <ActionList.Divider />
                            <ActionList.Group>
                                <ActionList.GroupHeading as="h3">Suggestions</ActionList.GroupHeading>
                                {filteredSuggestions.map((assignee) => (
                                    <ActionList.Item
                                        key={assignee.id}
                                        selected={selectedAssignees.has(assignee.id)}
                                        onSelect={() => handleToggle(assignee.id)}
                                    >
                                        {assignee.login}
                                        <ActionList.Description>{assignee.name}</ActionList.Description>
                                    </ActionList.Item>
                                ))}
                            </ActionList.Group>
                        </>
                    )}
                </ActionList>
            </div>
        </div>
    );
};
