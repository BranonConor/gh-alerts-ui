import { ReactNode } from "react";
import styles from "./AlertMetadataFieldContent.module.css";

export interface AlertMetadataFieldContentProps {
    children: ReactNode;
}

export function AlertMetadataFieldContent({ children }: AlertMetadataFieldContentProps) {
    return (
        <div className={styles.Content}>
            {children}
        </div>
    );
}
