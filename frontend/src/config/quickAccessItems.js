// Quick Access panel config (T-27). QuickAccessPanel reads it, so the items are config only.
import { FiAlertCircle, FiBarChart2, FiClipboard, FiFileText, FiFolder, FiSettings } from "react-icons/fi";
import { ROUTES } from "./routes";

// Quick Access panel (T-27), in mockup order.
//   path     : page the item opens (null = no page yet in Sprint 1)
//   countKey : key of the red count the page passes in ('counts'), if the item has one
export const QUICK_ACCESS_ITEMS = [
  {
    id: "evidence",
    icon: FiFileText,
    title: "Evidence Repository",
    subtitle: "Upload and manage project evidence",
    path: ROUTES.EVIDENCE_REPOSITORY,
  },
  {
    id: "artifacts",
    icon: FiFolder,
    title: "Artifact Repository",
    subtitle: "View all project artifacts",
    path: ROUTES.ARTIFACT_REPOSITORY,
  },
  {
    id: "smeTasks",
    icon: FiClipboard,
    title: "SME Tasks",
    subtitle: "View open validation tasks",
    path: null,
    countKey: "smeTasks",
  },
  {
    id: "issues",
    icon: FiAlertCircle,
    title: "Issues & Assumptions",
    subtitle: "View and manage",
    path: null,
    countKey: "issues",
  },
  {
    id: "reports",
    icon: FiBarChart2,
    title: "Reports & Dashboards",
    subtitle: "View project reports",
    path: ROUTES.REPORTS,
  },
  {
    id: "settings",
    icon: FiSettings,
    title: "Project Settings",
    subtitle: "Users, permissions, integrations",
    path: ROUTES.ADMIN_SETTINGS,
  },
];
