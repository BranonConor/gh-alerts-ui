import { ActionList } from '@primer/react';
import { AlertMetadataField } from '@/components/alerts/AlertMetadataField';
import { AlertMetadataFieldTitle } from '@/components/alerts/AlertMetadataFieldTitle';
import styles from './SecurityCampaigns.module.css';

export interface SecurityCampaignsProps {
    showDivider?: boolean;
}

export function SecurityCampaigns({ showDivider = true }: SecurityCampaignsProps) {
    return (
        <AlertMetadataField showDivider={showDivider}>
            <AlertMetadataFieldTitle title="Security campaigns" />
            <div className={styles.CampaignsList}>
                <ActionList.Item>
                    <span className={styles.CampaignName}>Campaign name</span>
                    <ActionList.Description variant="block" className={styles.CampaignDescription}>
                        0% complete, overdue Jun 30
                    </ActionList.Description>
                </ActionList.Item>
            </div>
        </AlertMetadataField>
    );
}
