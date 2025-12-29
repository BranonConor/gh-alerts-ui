import { ReactNode } from "react";
import { ActionList } from "@primer/react";
import styles from "./AlertMetadataField.module.css";

export interface AlertMetadataFieldProps {
    children: ReactNode;
    showDivider?: boolean;
}

export function AlertMetadataField({
    children,
    showDivider = true,
}: AlertMetadataFieldProps) {
    return (
        <div className={styles.AlertMetadataField}>
            {children}
            {showDivider && <ActionList.Divider className={styles.Divider} />}
        </div>
    );
}
