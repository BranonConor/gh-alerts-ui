"use client";
import { use } from "react";
import { Box, Heading } from "@primer/react";

export default function SecretScanningAlertDetailPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug, id } = use(params);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Heading as="h2" sx={{ fontSize: 24, fontWeight: 600, mb: 3 }}>
                Secret Scanning Alert #{id}
            </Heading>
            <Box>
                <p>Alert detail page for {slug}</p>
            </Box>
        </Box>
    );
}
