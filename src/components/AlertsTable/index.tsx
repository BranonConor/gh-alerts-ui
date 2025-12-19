import { Button, Heading, Link as PrimerLink, Text } from "@primer/react"
import styles from "./AlertsTable.module.css"
import { CheckIcon, LockIcon, ShieldIcon, TriangleDownIcon } from "@primer/octicons-react"
import Link from "next/link"

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
            <div className={styles.AlertsTableItem}>
                <div className={styles.Icon}>
                    <ShieldIcon />
                </div>
                <div className={styles.Title}>
                    <PrimerLink href="#">Remove code injection in Log4j</PrimerLink>
                    <p>
                        <Text size='small' color='var(--fgColor-muted)'>Opened 5 months ago - Detected in org.apache.logging - pom.xml</Text>
                    </p>
                </div>
                <div className={styles.RightContent}>
                    <Text size='small' color='var(--fgColor-muted)'>
                        <LockIcon size="small" />
                        dsp-testing/test-123
                    </Text>
                </div>
            </div>
        </div >
    )
}