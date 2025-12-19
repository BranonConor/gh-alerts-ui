import styles from "./AlertsTable.module.css";
import { AlertsTableHeader } from "./subcomponents/AlertsTableHeader";
import { AlertsTableItem } from "./subcomponents/AlertsTableItem";

// Type definitions for different alert sources
type DependabotAlert = {
    number: number;
    state: string;
    created_at?: string;
    dependency: {
        package: {
            ecosystem: string;
            name: string;
        };
        manifest_path: string;
        scope: string;
    };
    security_advisory: {
        ghsa_id: string;
        cve_id: string;
        summary: string;
        description: string;
        severity: string;
    };
    security_vulnerability: {
        package: {
            ecosystem: string;
            name: string;
        };
        severity: string;
        vulnerable_version_range: string;
        first_patched_version: {
            identifier: string;
        };
    };
    url: string;
    html_url: string;
    repository: {
        id: number;
        name: string;
        full_name: string;
        private: boolean;
    };
};

type CodeScanningAlert = {
    number: number;
    created_at: string;
    updated_at: string;
    url: string;
    html_url: string;
    state: string;
    rule: {
        id: string;
        severity: string;
        security_severity_level: string;
        description: string;
        name: string;
    };
    tool: {
        name: string;
        version: string;
    };
    most_recent_instance: {
        ref: string;
        location: {
            path: string;
            start_line: number;
            end_line: number;
        };
        message: {
            text: string;
        };
    };
    repository: {
        id: number;
        name: string;
        full_name: string;
        private: boolean;
    };
};

type SecretScanningAlert = {
    number: number;
    created_at: string;
    updated_at: string;
    url: string;
    html_url: string;
    state: string;
    secret_type: string;
    secret_type_display_name: string;
    secret: string;
    validity?: string;
    repository: {
        id: number;
        name: string;
        full_name: string;
        private: boolean;
    };
};

export type AlertData = DependabotAlert | CodeScanningAlert | SecretScanningAlert;

interface AlertTableProps {
    data: AlertData[];
    alertType: 'dependabot' | 'code-scanning' | 'secret-scanning';
}

// Helper function to determine alert details based on type
const getAlertDetails = (alert: AlertData, alertType: string) => {
    switch (alertType) {
        case 'dependabot':
            const dependabotAlert = alert as DependabotAlert;
            return {
                title: dependabotAlert.security_advisory?.summary || 'Dependency Alert',
                detectedIn: `${dependabotAlert.dependency.package.name} (${dependabotAlert.dependency.package.ecosystem})`,
                fileName: dependabotAlert.dependency.manifest_path,
            };
        case 'code-scanning':
            const codeScanningAlert = alert as CodeScanningAlert;
            return {
                title: codeScanningAlert.rule.description,
                detectedIn: `${codeScanningAlert.tool.name} v${codeScanningAlert.tool.version}`,
                fileName: codeScanningAlert.most_recent_instance.location.path,
            };
        case 'secret-scanning':
            const secretScanningAlert = alert as SecretScanningAlert;
            return {
                title: secretScanningAlert.secret_type_display_name,
                detectedIn: secretScanningAlert.validity ? `Validity: ${secretScanningAlert.validity}` : 'Secret detected',
                fileName: secretScanningAlert.secret,
            };
        default:
            return {
                title: 'Unknown Alert',
                detectedIn: '',
                fileName: '',
            };
    }
};

export const AlertsTable = ({ data, alertType }: AlertTableProps) => {
    // Count open and closed alerts
    const openCount = data.filter(alert => alert.state === 'open').length;
    const closedCount = data.filter(alert => alert.state !== 'open').length;

    return (
        <div className={styles.AlertsTable}>
            <AlertsTableHeader openCount={openCount} closedCount={closedCount} />
            {data?.map((alert, index) => {
                const alertDetails = getAlertDetails(alert, alertType);

                return (
                    <AlertsTableItem
                        key={alert.number || index}
                        title={alertDetails.title}
                        url={alert.html_url}
                        openedTime={alert.created_at || ''}
                        detectedIn={alertDetails.detectedIn}
                        fileName={alertDetails.fileName}
                        repository={alert.repository.full_name}
                        isPrivate={alert.repository.private}
                    />
                );
            })}
        </div>
    );
};
