"use client";
import { use } from "react";
import {
  Box,
  Heading,
  Text,
  TextInput,
  Button,
  Link,
  Label,
  ActionList,
  ActionMenu,
} from "@primer/react";
import {
  SearchIcon,
  ShieldIcon,
  CheckIcon,
  LockIcon,
  TriangleDownIcon,
} from "@primer/octicons-react";
import { AlertsTable } from "@/components/AlertsTable";

export default function DependabotAlertsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
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
          Dependabot alerts
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

      <AlertsTable />
    </Box>
  );
}
