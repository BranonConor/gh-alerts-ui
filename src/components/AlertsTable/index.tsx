import { Button } from "@primer/react"
import styles from "./AlertsTable.module.css"
import { CheckIcon, ShieldIcon, TriangleDownIcon } from "@primer/octicons-react"

export const AlertsTable = () => {
    return (
        <div className={styles.AlertsTable}>
            <div className={styles.AlertsTableHeader}>
                <div className={styles.Tabber}>
                    <Button variant='invisible' leadingVisual={<ShieldIcon />} >10 Open</Button>
                    <Button variant='invisible' leadingVisual={<CheckIcon />} className={styles.inactive}>0 Closed</Button>
                </div>

                <div className={styles.Filters}>
                    <Button variant='invisible' trailingAction={TriangleDownIcon}>Organization</Button>
                    <Button variant='invisible' trailingAction={TriangleDownIcon}>Repository</Button>
                    <Button variant='invisible' trailingAction={TriangleDownIcon}>Package</Button>
                    <Button variant='invisible' trailingAction={TriangleDownIcon}>Ecosystem</Button>
                    <Button variant='invisible' trailingAction={TriangleDownIcon}>Severity</Button>
                    <Button variant='invisible' trailingAction={TriangleDownIcon}>Sort</Button>
                </div>
            </div>
            <div className={styles.AlertsTableItem}>ITEM</div>
        </div>
    )
}