import { useState } from "react";
import { ActionList, TextInput } from "@primer/react";
import { SearchIcon, GitPullRequestDraftIcon } from "@primer/octicons-react";
import styles from "./DevelopmentOverlay.module.css";

interface PullRequest {
    id: string;
    number: number;
    title: string;
    state: "open" | "draft" | "closed";
}

interface DevelopmentOverlayProps {
    linkedPullRequests?: PullRequest[];
    suggestions?: PullRequest[];
    onPullRequestToggle?: (prId: string, selected: boolean) => void;
}

export const DevelopmentOverlay = ({
    linkedPullRequests = [],
    suggestions = [],
    onPullRequestToggle
}: DevelopmentOverlayProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPRs, setSelectedPRs] = useState<Set<string>>(
        new Set(linkedPullRequests.map(pr => pr.id))
    );

    const handleToggle = (prId: string) => {
        const newSelected = new Set(selectedPRs);
        const isSelected = newSelected.has(prId);

        if (isSelected) {
            newSelected.delete(prId);
        } else {
            newSelected.add(prId);
        }

        setSelectedPRs(newSelected);
        onPullRequestToggle?.(prId, !isSelected);
    };

    const filterPRs = (prs: PullRequest[]) => {
        if (!searchQuery) return prs;
        const query = searchQuery.toLowerCase();
        return prs.filter(
            pr => pr.title.toLowerCase().includes(query) ||
                pr.number.toString().includes(query)
        );
    };

    const filteredLinkedPRs = filterPRs(linkedPullRequests);
    const filteredSuggestions = filterPRs(suggestions);

    return (
        <div className={styles.DevelopmentOverlay}>
            <div className={styles.SearchContainer}>
                <TextInput
                    leadingVisual={SearchIcon}
                    placeholder="Filter pull requests"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="small"
                    block
                />
            </div>
            <div className={styles.ScrollableContent}>
                <ActionList selectionVariant="multiple">
                    {filteredLinkedPRs.length > 0 && (
                        <>
                            <ActionList.Group>
                                <ActionList.GroupHeading as="h3">Linked pull requests</ActionList.GroupHeading>
                                {filteredLinkedPRs.map((pr) => (
                                    <ActionList.Item
                                        key={pr.id}
                                        selected={selectedPRs.has(pr.id)}
                                        onSelect={() => handleToggle(pr.id)}
                                    >
                                        <ActionList.LeadingVisual>
                                            <GitPullRequestDraftIcon />
                                        </ActionList.LeadingVisual>
                                        {pr.title}
                                        <ActionList.Description variant="block">#{pr.number}</ActionList.Description>
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
                                {filteredSuggestions.map((pr) => (
                                    <ActionList.Item
                                        key={pr.id}
                                        selected={selectedPRs.has(pr.id)}
                                        onSelect={() => handleToggle(pr.id)}
                                    >
                                        <ActionList.LeadingVisual>
                                            <GitPullRequestDraftIcon />
                                        </ActionList.LeadingVisual>
                                        {pr.title}
                                        <ActionList.Description variant="block">#{pr.number}</ActionList.Description>
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
