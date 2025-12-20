import { Link as PrimerLink, Text } from "@primer/react";
import { LockIcon, ShieldIcon, GlobeIcon } from "@primer/octicons-react";
import styles from "./AlertsTableItem.module.css";
import Link from "next/link";

interface AlertsTableItemProps {
    title: string;
    url: string;
    openedTime: string;
    repository: string;
    detectedIn?: string;
    fileName?: string;
    isPrivate?: boolean;
}

// Helper function to format time since opened
const formatTimeSince = (dateString: string) => {
    if (!dateString) return 'Recently';

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
        return `Opened ${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
        return `Opened ${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
        return `Opened ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
        return 'Opened recently';
    }
};

export function AlertsTableItem({
    title,
    url,
    repository,
    openedTime,
    detectedIn,
    fileName,
    isPrivate = true,
}: AlertsTableItemProps) {
    const timeSince = formatTimeSince(openedTime);

    // Build the metadata string
    const metadataParts = [timeSince];
    if (detectedIn) {
        metadataParts.push(detectedIn);
    }
    if (fileName) {
        metadataParts.push(fileName);
    }
    const metadata = metadataParts.join(' • ');

    return (
        <div className={styles.AlertsTableItem}>
            <div className={styles.Icon}>
                <ShieldIcon />
            </div>
            <div className={styles.Title}>
                <Link href={url}>{title}</Link>
                <p>
                    <Text size="small" color="var(--fgColor-muted)">
                        {metadata}
                    </Text>
                </p>
            </div>
            <div className={styles.RightContent}>
                <Text size="small" color="var(--fgColor-muted)">
                    {isPrivate ? <LockIcon size="small" /> : <GlobeIcon size="small" />}
                    {repository}
                </Text>
            </div>
        </div>
    );
}
