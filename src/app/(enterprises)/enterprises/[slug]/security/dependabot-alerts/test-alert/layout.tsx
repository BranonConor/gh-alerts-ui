"use client";
import { Box } from "@primer/react";

export default function DependabotAlertDetailLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                height: "100%",
            }}
        >
            <Box sx={{ maxWidth: "1280px", width: "100%", paddingX: 3, paddingTop: "24px", paddingBottom: 3 }}>
                {children}
            </Box>
        </Box>
    );
}
