import { Link as PrimerLink, Text } from "@primer/react";
import { LockIcon, ShieldIcon } from "@primer/octicons-react";
import styles from "./AlertsTableItem.module.css";

interface AlertsTableItemProps {
    title: string;
    url: string;
    openedTime: string;
    repository: string;
}

export function AlertsTableItem({
    title,
    url,
    repository,
}: AlertsTableItemProps) {
    return (
        <div className={styles.AlertsTableItem}>
            <div className={styles.Icon}>
                <ShieldIcon />
            </div>
            <div className={styles.Title}>
                <PrimerLink href={url}>{title}</PrimerLink>
                <p>
                    <Text size="small" color="var(--fgColor-muted)">
                        Opened 5 months ago • Detected in org.apache.logging.log4j:log4j-core (Maven) • pom.xml
                    </Text>
                </p>
            </div>
            <div className={styles.RightContent}>
                <Text size="small" color="var(--fgColor-muted)">
                    <LockIcon size="small" />
                    {repository}
                </Text>
            </div>
        </div>
    );
}
