import styles from "./AlertsTable.module.css";
import { AlertsTableHeader } from "./subcomponents/AlertsTableHeader";
import { AlertsTableItem } from "./subcomponents/AlertsTableItem";
import dependabotData from '../../mockData/dependabot.json';
import codeScanningData from '../../mockData/code-scanning.json';
import secretScanningData from '../../mockData/secret-scanning.json';

interface AlertTableProps {
    data: typeof dependabotData | typeof codeScanningData | typeof secretScanningData
}
export const AlertsTable = ({ data }: AlertTableProps) => {
    const getAlertType = () => {
        if (typeof data === typeof dependabotData) {
            return 'dependabot';
        } else if (typeof data === typeof codeScanningData) {
            return 'code-scanning';
        } else {
            return 'secret-scanning';
        }
    }

    return (
        <div className={styles.AlertsTable}>
            <AlertsTableHeader openCount={data?.length ?? 0} closedCount={0} />
            {data?.map((alert, index) => {

                const alertType = getAlertType();

                return (
                    <AlertsTableItem
                        key={index}
                        title={(() => {
                            if (alertType === 'dependabot' && 'security_advisory' in alert) {
                                return alert.security_advisory?.summary;
                            } else if (alertType === 'code-scanning' && 'rule' in alert) {
                                return alert.rule.description;
                            } else if (alertType === 'secret-scanning' && 'secret_type' in alert) {
                                return 'Secret detected: ' + alert.secret_type;
                            } else {
                                return 'Unknown Alert';
                            }
                        })()}
                        url={'/enterprises/avocado-corp/security/dependabot-alerts/alert'} //hard coded alert page route in this prototype
                        openedTime={alert.created_at}
                        repository={alert.repository.full_name}
                    />

                )
            })}
        </div>
    );
};
