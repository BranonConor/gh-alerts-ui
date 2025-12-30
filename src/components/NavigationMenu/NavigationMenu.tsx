"use client";
import { useState } from "react";
import {
    ActionList,
    ActionMenu,
    Box,
    IconButton,
} from "@primer/react";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import { enterpriseAccounts } from "@/defaults/accounts/enterprises";
import { organizationAccounts } from "@/defaults/accounts/organizations";
import { useRouter } from "next/navigation";

export function NavigationMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleNavigation = (href: string) => {
        router.push(href);
        setOpen(false);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 1000,
            }}
        >
            <ActionMenu open={open} onOpenChange={setOpen}>
                <ActionMenu.Anchor>
                    <IconButton
                        icon={KebabHorizontalIcon}
                        aria-label="Navigation menu"
                        size="large"
                        sx={{
                            borderRadius: "50%",
                            width: 56,
                            height: 56,
                            boxShadow: "shadow.large",
                            bg: "success.emphasis",
                            color: "fg.onEmphasis",
                            "&:hover": {
                                bg: "success.emphasis",
                                opacity: 0.85,
                            },
                        }}
                    />
                </ActionMenu.Anchor>
                <ActionMenu.Overlay width="large">
                    <ActionList sx={{ maxHeight: 500, overflowY: "auto" }}>
                        <ActionList.Group title="Copilot">
                            <ActionList.Item onSelect={() => handleNavigation("/copilot")}>
                                Copilot Overview
                            </ActionList.Item>
                            <ActionList.Item
                                onSelect={() => handleNavigation("/copilot/agents")}
                            >
                                Agents
                            </ActionList.Item>
                            <ActionList.Item
                                onSelect={() => handleNavigation("/copilot/loops")}
                            >
                                Loops
                            </ActionList.Item>
                            <ActionList.Item
                                onSelect={() => handleNavigation("/copilot/spaces")}
                            >
                                Spaces
                            </ActionList.Item>
                        </ActionList.Group>

                        <ActionList.Divider />

                        <ActionList.Group title="Enterprises">
                            {enterpriseAccounts.map((enterprise) => (
                                <ActionList.Group
                                    key={enterprise.slug}
                                    title={enterprise.name}
                                    selectionVariant="single"
                                >
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/enterprises/${enterprise.slug}`)
                                        }
                                    >
                                        Overview
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/enterprises/${enterprise.slug}/billing`)
                                        }
                                    >
                                        Billing
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(
                                                `/enterprises/${enterprise.slug}/compliance`
                                            )
                                        }
                                    >
                                        Compliance
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/enterprises/${enterprise.slug}/insights`)
                                        }
                                    >
                                        Insights
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(
                                                `/enterprises/${enterprise.slug}/installations`
                                            )
                                        }
                                    >
                                        Installations
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(
                                                `/enterprises/${enterprise.slug}/organizations`
                                            )
                                        }
                                    >
                                        Organizations
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/enterprises/${enterprise.slug}/people`)
                                        }
                                    >
                                        People
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/enterprises/${enterprise.slug}/policies`)
                                        }
                                    >
                                        Policies
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/enterprises/${enterprise.slug}/security`)
                                        }
                                    >
                                        Security
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/enterprises/${enterprise.slug}/settings`)
                                        }
                                    >
                                        Settings
                                    </ActionList.Item>
                                </ActionList.Group>
                            ))}
                        </ActionList.Group>

                        <ActionList.Divider />

                        <ActionList.Group title="Organizations">
                            {organizationAccounts.map((org) => (
                                <ActionList.Group
                                    key={org.slug}
                                    title={org.name}
                                    selectionVariant="single"
                                >
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}`)
                                        }
                                    >
                                        Overview
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/insights`)
                                        }
                                    >
                                        Insights
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/packages`)
                                        }
                                    >
                                        Packages
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/people`)
                                        }
                                    >
                                        People
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/projects`)
                                        }
                                    >
                                        Projects
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/repositories`)
                                        }
                                    >
                                        Repositories
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/security`)
                                        }
                                    >
                                        Security
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/settings`)
                                        }
                                    >
                                        Settings
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/sponsoring`)
                                        }
                                    >
                                        Sponsoring
                                    </ActionList.Item>
                                    <ActionList.Item
                                        onSelect={() =>
                                            handleNavigation(`/organizations/${org.slug}/teams`)
                                        }
                                    >
                                        Teams
                                    </ActionList.Item>
                                </ActionList.Group>
                            ))}
                        </ActionList.Group>
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>
        </Box>
    );
}
