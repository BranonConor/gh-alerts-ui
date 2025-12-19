import {
  HomeIcon,
  GraphIcon,
  KeyIcon,
  ShieldIcon,
  DependabotIcon,
  MeterIcon,
  CodescanIcon,
  LawIcon
} from "@primer/octicons-react";
import { PageNavigation } from "@/types/navigation";

export const security: PageNavigation = {
  name: "Security",
  slug: "security",
  groups: [
    {
      items: [
        {
          name: "Overview",
          icon: HomeIcon,
          path: "security",
        },
        {
          name: "Risk",
          icon: ShieldIcon,
        },
        {
          name: "Coverage",
          icon: MeterIcon,
        },
      ],
    },
    {
      items: [
        {
          name: "Enablement trends",
          icon: MeterIcon,
        },
        {
          name: "CodeQL pull request alerts",
          icon: GraphIcon,
        },
        {
          name: "Secret scanning metrics",
          icon: GraphIcon,
        },
      ],
    },
    {
      items: [
        {
          name: "Dependabot alerts",
          icon: DependabotIcon,
          path: "security/dependabot-alerts",
        },
        {
          name: "Code scanning alerts",
          icon: CodescanIcon,
          path: "security/code-scanning-alerts",
        },
        {
          name: "Secret scanning alerts",
          icon: KeyIcon,
          path: "security/secret-scanning-alerts",
        },
      ],
    },
    {
      items: [
        {
          name: "Secret scanning dismissal requests",
          icon: KeyIcon,
        },
        {
          name: "Code scanning dismissal requests",
          icon: CodescanIcon,
        },
        {
          name: "Dependabot dismissal requests",
          icon: DependabotIcon,
        },
        {
          name: "Push protection bypass",
          icon: KeyIcon,
        },
        {
          name: "License alert requests",
          icon: LawIcon,
        },
      ],
    },
  ],
};
