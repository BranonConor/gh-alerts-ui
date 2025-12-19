"use client";
import { JSX, useState } from "react";
import {
  InboxIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  PlusIcon,
  SearchIcon,
  CopilotIcon,
  MarkGithubIcon,
  ThreeBarsIcon,
  TriangleDownIcon,
} from "@primer/octicons-react";
import { Avatar, ButtonGroup, IconButton, TextInput, ActionMenu, ActionList } from "@primer/react";
import { useRouter, usePathname } from "next/navigation";

import { useBreadcrumbs } from "@/utils/navigation";
import { Breadcrumb } from "./subcomponents/Breadcrumb";
import { GlobalNav } from "./subcomponents/GlobalNav";
import styles from "./AppHeader.module.css";
import { BreadcrumbItem, GlobalNavigationVariant } from "@/types/navigation";
import { enterpriseAccounts } from "@/defaults/accounts/enterprises";
import { organizationAccounts } from "@/defaults/accounts/organizations";

interface AppHeaderProps {
  withGlobalNav?: GlobalNavigationVariant;
  withCustomBreadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({
  withGlobalNav,
  withCustomBreadcrumbs,
}: AppHeaderProps = {}): JSX.Element {
  const userAvatarSrc: string =
    "https://avatars.githubusercontent.com/u/92997159?v=4";
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const autoBreadcrumbItems = useBreadcrumbs();
  const breadcrumbItems = withCustomBreadcrumbs || autoBreadcrumbItems;

  const handleNavigation = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.leftSection}>
          <ActionMenu open={open} onOpenChange={setOpen}>
            <ActionMenu.Anchor>
              <IconButton
                icon={ThreeBarsIcon}
                aria-label="Open global navigation menu"
              />
            </ActionMenu.Anchor>
            <ActionMenu.Overlay width="auto">
              <ActionList>
                <ActionList.Group title="Prototype Routes">
                  <ActionMenu>
                    <ActionMenu.Anchor>
                      <ActionList.Item>Copilot</ActionList.Item>
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay>
                      <ActionList>
                        <ActionList.Item
                          active={pathname === "/copilot"}
                          onSelect={() => handleNavigation("/copilot")}
                        >
                          Copilot Overview
                        </ActionList.Item>
                        <ActionList.Item
                          active={pathname === "/copilot/agents"}
                          onSelect={() => handleNavigation("/copilot/agents")}
                        >
                          Agents
                        </ActionList.Item>
                        <ActionList.Item
                          active={pathname === "/copilot/loops"}
                          onSelect={() => handleNavigation("/copilot/loops")}
                        >
                          Loops
                        </ActionList.Item>
                        <ActionList.Item
                          active={pathname === "/copilot/spaces"}
                          onSelect={() => handleNavigation("/copilot/spaces")}
                        >
                          Spaces
                        </ActionList.Item>
                      </ActionList>
                    </ActionMenu.Overlay>
                  </ActionMenu>

                  <ActionMenu>
                    <ActionMenu.Anchor>
                      <ActionList.Item>Enterprises</ActionList.Item>
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay>
                      <ActionList sx={{ maxHeight: 500, overflowY: "auto" }}>
                        {enterpriseAccounts.map((enterprise) => (
                          <ActionMenu key={enterprise.slug}>
                            <ActionMenu.Anchor>
                              <ActionList.Item>{enterprise.name}</ActionList.Item>
                            </ActionMenu.Anchor>
                            <ActionMenu.Overlay>
                              <ActionList>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}`}
                                  onSelect={() =>
                                    handleNavigation(`/enterprises/${enterprise.slug}`)
                                  }
                                >
                                  Overview
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/billing`}
                                  onSelect={() =>
                                    handleNavigation(`/enterprises/${enterprise.slug}/billing`)
                                  }
                                >
                                  Billing
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/compliance`}
                                  onSelect={() =>
                                    handleNavigation(
                                      `/enterprises/${enterprise.slug}/compliance`
                                    )
                                  }
                                >
                                  Compliance
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/insights`}
                                  onSelect={() =>
                                    handleNavigation(`/enterprises/${enterprise.slug}/insights`)
                                  }
                                >
                                  Insights
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/installations`}
                                  onSelect={() =>
                                    handleNavigation(
                                      `/enterprises/${enterprise.slug}/installations`
                                    )
                                  }
                                >
                                  Installations
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/organizations`}
                                  onSelect={() =>
                                    handleNavigation(
                                      `/enterprises/${enterprise.slug}/organizations`
                                    )
                                  }
                                >
                                  Organizations
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/people`}
                                  onSelect={() =>
                                    handleNavigation(`/enterprises/${enterprise.slug}/people`)
                                  }
                                >
                                  People
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/policies`}
                                  onSelect={() =>
                                    handleNavigation(`/enterprises/${enterprise.slug}/policies`)
                                  }
                                >
                                  Policies
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/security`}
                                  onSelect={() =>
                                    handleNavigation(`/enterprises/${enterprise.slug}/security`)
                                  }
                                >
                                  Security
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/enterprises/${enterprise.slug}/settings`}
                                  onSelect={() =>
                                    handleNavigation(`/enterprises/${enterprise.slug}/settings`)
                                  }
                                >
                                  Settings
                                </ActionList.Item>
                              </ActionList>
                            </ActionMenu.Overlay>
                          </ActionMenu>
                        ))}
                      </ActionList>
                    </ActionMenu.Overlay>
                  </ActionMenu>

                  <ActionMenu>
                    <ActionMenu.Anchor>
                      <ActionList.Item>Organizations</ActionList.Item>
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay>
                      <ActionList sx={{ maxHeight: 500, overflowY: "auto" }}>
                        {organizationAccounts.map((org) => (
                          <ActionMenu key={org.slug}>
                            <ActionMenu.Anchor>
                              <ActionList.Item>{org.name}</ActionList.Item>
                            </ActionMenu.Anchor>
                            <ActionMenu.Overlay>
                              <ActionList>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}`)
                                  }
                                >
                                  Overview
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/insights`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/insights`)
                                  }
                                >
                                  Insights
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/packages`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/packages`)
                                  }
                                >
                                  Packages
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/people`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/people`)
                                  }
                                >
                                  People
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/projects`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/projects`)
                                  }
                                >
                                  Projects
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/repositories`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/repositories`)
                                  }
                                >
                                  Repositories
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/security`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/security`)
                                  }
                                >
                                  Security
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/settings`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/settings`)
                                  }
                                >
                                  Settings
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/sponsoring`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/sponsoring`)
                                  }
                                >
                                  Sponsoring
                                </ActionList.Item>
                                <ActionList.Item
                                  active={pathname === `/organizations/${org.slug}/teams`}
                                  onSelect={() =>
                                    handleNavigation(`/organizations/${org.slug}/teams`)
                                  }
                                >
                                  Teams
                                </ActionList.Item>
                              </ActionList>
                            </ActionMenu.Overlay>
                          </ActionMenu>
                        ))}
                      </ActionList>
                    </ActionMenu.Overlay>
                  </ActionMenu>
                </ActionList.Group>
              </ActionList>
            </ActionMenu.Overlay>
          </ActionMenu>
          <MarkGithubIcon size={32} />
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.searchSection}>
            <TextInput
              placeholder="Type / to search"
              leadingVisual={SearchIcon}
              contrast
            />
            <ButtonGroup>
              <IconButton icon={CopilotIcon} aria-label="Chat with Copilot" />
              <IconButton
                icon={TriangleDownIcon}
                aria-label="Open Copilot..."
              />
            </ButtonGroup>
          </div>
          <div className={styles.divider} />
          <div className={styles.actionsSection}>
            <ButtonGroup>
              <IconButton icon={PlusIcon} aria-label="Create new..." />
              <IconButton icon={TriangleDownIcon} aria-label="Create new..." />
            </ButtonGroup>
            <IconButton icon={IssueOpenedIcon} aria-label="Your issues" />
            <IconButton
              icon={GitPullRequestIcon}
              aria-label="Your pull requests"
            />
            <IconButton icon={InboxIcon} aria-label="Open inbox" />
            <Avatar src={userAvatarSrc} size={32} />
          </div>
        </div>
      </div>
      {withGlobalNav && (
        <div className={styles.globalNavRow}>
          <GlobalNav variant={withGlobalNav} />
        </div>
      )}
    </div>
  );
}

AppHeader.displayName = "AppHeader";
