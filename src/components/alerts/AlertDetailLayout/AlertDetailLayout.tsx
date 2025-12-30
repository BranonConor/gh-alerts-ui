import { ReactNode } from "react";
import styles from "./AlertDetailLayout.module.css";

export interface AlertDetailLayoutProps {
    leftContent: ReactNode;
    rightContent: ReactNode;
}

export function AlertDetailLayout({ leftContent, rightContent }: AlertDetailLayoutProps) {
    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                {leftContent}
            </div>
            <div className={styles.rightPanel}>
                {rightContent}
            </div>
        </div>
    );
}
