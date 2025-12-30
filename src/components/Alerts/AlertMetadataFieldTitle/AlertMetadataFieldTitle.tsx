import { forwardRef, ReactNode } from "react";
import { ActionList, ActionListItemProps, Text } from "@primer/react";
import styles from "./AlertMetadataFieldTitle.module.css";

export interface AlertMetadataFieldTitleProps extends Omit<ActionListItemProps, 'children' | 'onSelect' | 'role'> {
    title: string;
    trailingVisual?: ReactNode;
    isInteractive?: boolean;
    onClick?: () => void;
}

export const AlertMetadataFieldTitle = forwardRef<HTMLLIElement, AlertMetadataFieldTitleProps>(
    ({ title, trailingVisual, isInteractive = false, onClick, className, ...restProps }, ref) => {
        const itemClassName = `${styles.AlertMetadataFieldTitle} ${!isInteractive ? styles.NonInteractive : ''} ${className || ''}`.trim();

        return (
            <ActionList.Item ref={ref as any} className={itemClassName} onClick={onClick} {...restProps}>
                <Text className={styles.TitleText}>{title}</Text>
                {trailingVisual && (
                    <ActionList.TrailingVisual>
                        {trailingVisual}
                    </ActionList.TrailingVisual>
                )}
            </ActionList.Item>
        );
    }
);
