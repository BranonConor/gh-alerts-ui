"use client";
import { use } from "react";
import { Blankslate } from "@primer/react/experimental";

export default function DependabotAlertsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Blankslate spacious>
      <Blankslate.Heading>Dependabot alerts for {slug}</Blankslate.Heading>
      <Blankslate.Description>
        This page will display Dependabot alerts for your enterprise
      </Blankslate.Description>
    </Blankslate>
  );
}
