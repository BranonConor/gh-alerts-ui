import { ActionList, Label } from '@primer/react';
import { ShieldIcon } from '@primer/octicons-react';
import { AlertMetadataField } from '@/components/alerts/AlertMetadataField';
import { AlertMetadataFieldTitle } from '@/components/alerts/AlertMetadataFieldTitle';
import styles from './AffectedBranches.module.css';

export interface AffectedBranchesProps {
    showDivider?: boolean;
}

export function AffectedBranches({ showDivider = true }: AffectedBranchesProps) {
    return (
        <AlertMetadataField showDivider={showDivider}>
            <AlertMetadataFieldTitle title="Affected branches" />
            <div className={styles.BranchesList}>
                <ActionList.Item>
                    <ActionList.LeadingVisual>
                        <ShieldIcon className={styles.ShieldIcon} />
                    </ActionList.LeadingVisual>
                    <span className={styles.BranchTitle}>
                        <code className={styles.BranchCode}>main</code>
                        {' '}
                        <Label variant="default">default</Label>
                    </span>
                    <ActionList.Description variant="block" className={styles.BranchDescription}>
                        First detected 5 months ago
                    </ActionList.Description>
                </ActionList.Item>
            </div>
        </AlertMetadataField>
    );
}
