"use client";
import { use } from "react";
import { Blankslate } from "@primer/react/experimental";

export default function SecretScanningAlertsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Blankslate spacious>
      <Blankslate.Heading>Secret scanning alerts for {slug}</Blankslate.Heading>
      <Blankslate.Description>
        This page will display secret scanning alerts for your enterprise
      </Blankslate.Description>
    </Blankslate>
  );
}
