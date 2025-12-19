"use client";
import { use } from "react";
import { redirect } from "next/navigation";

export default function EnterpriseSecurityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  redirect(`/enterprises/${slug}/security/dependabot-alerts`);
}
