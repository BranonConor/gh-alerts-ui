import styles from "./AlertsTable.module.css";
import { AlertsTableHeader } from "./subcomponents/AlertsTableHeader";
import { AlertsTableItem } from "./subcomponents/AlertsTableItem";
import mockData from '../../mockData/dependabot.json';

export const AlertsTable = () => {
    return (
        <div className={styles.AlertsTable}>
            <AlertsTableHeader openCount={mockData.length ?? 0} closedCount={0} />
            {mockData.map((alert, index) => (
                <AlertsTableItem
                    key={index}
                    title={alert.security_advisory.summary}
                    url={'/enterprises/avocado-corp/security/dependabot-alerts/alert'} //hard coded alert page route in this prototype
                    openedTime={alert.created_at}
                    repository={alert.repository.full_name}
                />

            ))}
        </div>
    );
};
