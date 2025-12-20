"use client";
import { use } from "react";
import {
  Box,
  Heading,
  TextInput,
  Link,
  PageLayout,
} from "@primer/react";
import {
  SearchIcon,
} from "@primer/octicons-react";
import { AlertsTable } from "@/components/Alerts/AlertsTable";
import { SecurityLeftPanel } from "@/components/SecurityLeftPanel";
import secretScanningData from "@/mockData/secret-scanning.json";

export default function SecretScanningAlertsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <>
      <SecurityLeftPanel />
      <PageLayout.Content padding="condensed" width="xlarge">
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Heading as="h2" sx={{ fontSize: 24, fontWeight: 600 }}>
              Secret scanning alerts
            </Heading>
            <Link href="#" sx={{ fontSize: 1 }}>
              Get updates and share feedback
            </Link>
          </Box>

          {/* Search and filter bar */}
          <Box sx={{ mb: 3 }}>
            <TextInput
              leadingVisual={SearchIcon}
              placeholder="is:open"
              sx={{ width: "100%" }}
            />
          </Box>

          <AlertsTable
            data={secretScanningData}
            alertType="secret-scanning"
            detailUrl={`secret-scanning-alerts/test-alert`}
          />
        </Box>
      </PageLayout.Content>
    </>
  );
}
