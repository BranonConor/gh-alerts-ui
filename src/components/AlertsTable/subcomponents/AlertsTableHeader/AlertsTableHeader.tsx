import { Button } from "@primer/react";
import { CheckIcon, ShieldIcon, TriangleDownIcon } from "@primer/octicons-react";
import styles from "./AlertsTableHeader.module.css";

interface AlertsTableHeaderProps {
    openCount: number;
    closedCount: number;
}

export function AlertsTableHeader({ openCount, closedCount }: AlertsTableHeaderProps) {
    return (
        <div className={styles.AlertsTableHeader}>
            <div className={styles.Tabber}>
                <Button variant="invisible" leadingVisual={<ShieldIcon />}>
                    {openCount} Open
                </Button>
                <Button
                    variant="invisible"
                    leadingVisual={<CheckIcon />}
                    className={styles.inactive}
                >
                    {closedCount} Closed
                </Button>
            </div>

            <div className={styles.Filters}>
                <Button variant="invisible" trailingAction={TriangleDownIcon}>
                    Organization
                </Button>
                <Button variant="invisible" trailingAction={TriangleDownIcon}>
                    Repository
                </Button>
                <Button variant="invisible" trailingAction={TriangleDownIcon}>
                    Package
                </Button>
                <Button variant="invisible" trailingAction={TriangleDownIcon}>
                    Ecosystem
                </Button>
                <Button variant="invisible" trailingAction={TriangleDownIcon}>
                    Severity
                </Button>
                <Button variant="invisible" trailingAction={TriangleDownIcon}>
                    Sort
                </Button>
            </div>
        </div>
    );
}
