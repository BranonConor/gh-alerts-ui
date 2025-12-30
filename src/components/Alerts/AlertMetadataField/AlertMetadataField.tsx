import { ReactNode } from "react";
import { ActionList } from "@primer/react";
import styles from "./AlertMetadataField.module.css";

export interface AlertMetadataFieldProps {
    children: ReactNode;
    showDivider?: boolean;
    removeGap?: boolean;
}

export function AlertMetadataField({
    children,
    showDivider = true,
    removeGap = false,
}: AlertMetadataFieldProps) {
    const className = removeGap
        ? `${styles.AlertMetadataField} ${styles.NoGap}`
        : styles.AlertMetadataField;

    return (
        <div className={className}>
            {children}
            {showDivider && <ActionList.Divider className={styles.Divider} />}
        </div>
    );
}
