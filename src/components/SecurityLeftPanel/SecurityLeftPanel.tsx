import { PageLayout } from "@primer/react";
import { ParentNavigation } from "@/components/ParentNavigation";

export function SecurityLeftPanel() {
    return (
        <PageLayout.Pane
            position="start"
            divider="line"
            padding="condensed"
            width="large"
        >
            <ParentNavigation />
        </PageLayout.Pane>
    );
}
