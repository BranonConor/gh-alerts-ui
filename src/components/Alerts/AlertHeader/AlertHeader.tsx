"use client";
import { Heading, Link, Text } from "@primer/react";
import { usePathname } from "next/navigation";
import styles from "./AlertHeader.module.css";
import { AlertStateLabel } from "./subcomponents/AlertStateLabel";
import { ReactNode } from "react";

interface AlertHeaderProps {
    alertStatus?: "open" | "dismissed" | "fixed";
    subtitleContent?: string;
    timestamp?: string;
    title: string;
    breadCrumbUrl?: string;
    buttonGroup?: ReactNode;
}

export function AlertHeader({ alertStatus = 'open', subtitleContent, timestamp, title, breadCrumbUrl, buttonGroup }: AlertHeaderProps) {
    const pathname = usePathname();

    // Determine alert type from pathname
    let alertType: 'dependabot' | 'code-scanning' | 'secret-scanning' | null = null;

    if (pathname.includes('dependabot-alerts')) {
        alertType = 'dependabot';
    } else if (pathname.includes('code-scanning-alerts')) {
        alertType = 'code-scanning';
    } else if (pathname.includes('secret-scanning-alerts')) {
        alertType = 'secret-scanning';
    }

    return (
        <div className={styles.AlertHeader}>
            <div className={styles.HeaderContent}>
                <div className={styles.Breadcrumb}>
                    <Link href={breadCrumbUrl ?? '#'} className={styles.Item}>
                        <Text size='medium' className={styles.Item}>{alertType}</Text>
                    </Link>
                    <Text size='medium' className={styles.Item}>/</Text>
                    <Text size='medium' className={styles.Item}>test-alert</Text>
                </div>
                <div className={styles.Title}>
                    <Heading>{title}</Heading>
                </div>
                <div className={styles.Subtitle}>
                    <AlertStateLabel variant={alertStatus} />
                    <Text size='medium'>{subtitleContent}</Text>
                    <Text size='medium'>{timestamp && new Date(timestamp).toLocaleString()}</Text>
                </div>
            </div>
            {buttonGroup && (
                <div className={styles.ButtonGroup}>
                    {buttonGroup}
                </div>
            )}
        </div>
    );
}
