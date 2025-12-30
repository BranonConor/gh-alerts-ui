import { Label } from "@primer/react";
import { AlertMetadataField } from "@/components/alerts/AlertMetadataField";
import { AlertMetadataFieldTitle } from "@/components/alerts/AlertMetadataFieldTitle";
import { AlertMetadataFieldContent } from "@/components/alerts/AlertMetadataFieldContent";
import styles from "./Severity.module.css";

export interface SeverityProps {
    severity: string;
    variant?: "default" | "primary" | "secondary" | "accent" | "success" | "attention" | "severe" | "danger" | "done" | "sponsors";
}

export function Severity({ severity, variant = "danger" }: SeverityProps) {
    return (
        <AlertMetadataField showDivider={true}>
            <AlertMetadataFieldTitle title="Severity" />
            <AlertMetadataFieldContent>
                <div className={styles.LabelWrapper}>
                    <Label variant={variant}>{severity}</Label>
                </div>
            </AlertMetadataFieldContent>
        </AlertMetadataField>
    );
}
