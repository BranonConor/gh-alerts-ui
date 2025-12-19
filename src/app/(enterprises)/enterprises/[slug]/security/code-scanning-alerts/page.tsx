"use client";
import { use } from "react";
import { Blankslate } from "@primer/react/experimental";

export default function CodeScanningAlertsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Blankslate spacious>
      <Blankslate.Heading>Code scanning alerts for {slug}</Blankslate.Heading>
      <Blankslate.Description>
        This page will display code scanning alerts for your enterprise
      </Blankslate.Description>
    </Blankslate>
  );
}
