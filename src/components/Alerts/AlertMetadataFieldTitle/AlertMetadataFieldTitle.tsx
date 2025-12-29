import { ReactNode } from "react";
import { ActionList, Text } from "@primer/react";
import styles from "./AlertMetadataFieldTitle.module.css";

export interface AlertMetadataFieldTitleProps {
    title: string;
    trailingVisual?: ReactNode;
    isInteractive?: boolean;
}

export function AlertMetadataFieldTitle({
    title,
    trailingVisual,
    isInteractive = false,
}: AlertMetadataFieldTitleProps) {
    const itemClassName = `${styles.AlertMetadataFieldTitle} ${!isInteractive ? styles.NonInteractive : ''}`.trim();

    return (
        <ActionList.Item className={itemClassName}>
            <Text className={styles.TitleText}>{title}</Text>
            {trailingVisual && (
                <ActionList.TrailingVisual>
                    {trailingVisual}
                </ActionList.TrailingVisual>
            )}
        </ActionList.Item>
    );
}
