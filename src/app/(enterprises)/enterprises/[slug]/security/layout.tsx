"use client";
import { PageLayout } from "@primer/react";

export default function EnterprisePeopleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageLayout
      rowGap="none"
      columnGap="none"
      padding="none"
      containerWidth="full"
      className="height-full"
    >
      {children}
    </PageLayout>
  );
}
