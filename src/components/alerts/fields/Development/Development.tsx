import { useState } from 'react';
import { ActionList, AnchoredOverlay } from '@primer/react';
import { GearIcon, GitPullRequestDraftIcon } from '@primer/octicons-react';
import { AlertMetadataField } from '@/components/alerts/AlertMetadataField';
import { AlertMetadataFieldTitle } from '@/components/alerts/AlertMetadataFieldTitle';
import { DevelopmentOverlay } from '@/components/alerts/DevelopmentOverlay';
import styles from './Development.module.css';

interface PullRequest {
    id: string;
    number: number;
    title: string;
    state: "open" | "draft" | "closed";
}

export interface DevelopmentProps {
    showDivider?: boolean;
    linkedPullRequests?: PullRequest[];
    suggestions?: PullRequest[];
    onPullRequestToggle?: (prId: string, selected: boolean) => void;
}

export function Development({
    showDivider = true,
    linkedPullRequests = [],
    suggestions = [],
    onPullRequestToggle
}: DevelopmentProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AlertMetadataField showDivider={showDivider}>
            <AnchoredOverlay
                open={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                width="medium"
                renderAnchor={(props) => (
                    <AlertMetadataFieldTitle
                        {...props}
                        title="Development"
                        isInteractive={true}
                        trailingVisual={<GearIcon />}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                )}
            >
                <DevelopmentOverlay
                    linkedPullRequests={linkedPullRequests}
                    suggestions={suggestions}
                    onPullRequestToggle={onPullRequestToggle}
                />
            </AnchoredOverlay>
            <div className={styles.DevelopmentList}>
                <ActionList.Item>
                    <ActionList.LeadingVisual>
                        <GitPullRequestDraftIcon />
                    </ActionList.LeadingVisual>
                    <span className={styles.PullRequestTitle}>Pull Request Title</span>
                    <ActionList.Description variant="block" className={styles.PullRequestDescription}>
                        #123 opened 2 months ago merges into <a href="#" className={styles.BranchLink}>master</a>
                    </ActionList.Description>
                </ActionList.Item>
            </div>
        </AlertMetadataField>
    );
}
