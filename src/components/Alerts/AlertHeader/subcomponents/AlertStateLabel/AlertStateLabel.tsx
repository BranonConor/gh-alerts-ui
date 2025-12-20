"use client";
import { ShieldIcon, ShieldCheckIcon, CheckCircleIcon } from "@primer/octicons-react";
import styles from "./AlertStateLabel.module.css";
import { Text } from "@primer/react";

interface AlertStateLabelProps {
    variant: "open" | "dismissed" | "fixed";
}

export function AlertStateLabel({ variant }: AlertStateLabelProps) {
    const config = {
        open: {
            icon: ShieldIcon,
            label: "Open",
            className: styles.Open,
        },
        dismissed: {
            icon: ShieldCheckIcon,
            label: "Dismissed",
            className: styles.Dismissed,
        },
        fixed: {
            icon: CheckCircleIcon,
            label: "Fixed",
            className: styles.Fixed,
        },
    };

    const { icon: Icon, label, className } = config[variant];

    return (
        <div className={`${styles.AlertStateLabel} ${className}`}>
            <Icon size={16} />
            <Text size='medium' weight="semibold">{label}</Text>
        </div>
    );
}
