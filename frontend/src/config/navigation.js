import { FiBarChart2, FiDatabase, FiFolder, FiHome, FiLayers, FiSettings } from "react-icons/fi";
import { ROUTES, WORKSPACE_ROUTES, ADMIN_ROUTES } from "./routes";

export const APP_TITLE = "AI Modernization Accelerator";


export const TOP_NAV_ITEMS = [
  { key: "home", type: "link", label: "Home", icon: FiHome, path: ROUTES.DASHBOARD },
  { key: "projects", type: "link", label: "Projects", icon: FiFolder, path: ROUTES.PROJECTS },
  {
    key: "workspaces",
    type: "dropdown",
    label: "Methodology Workspaces",
    icon: FiLayers,
    children: WORKSPACE_ROUTES.map((w) => ({
      key: w.key,
      label: `${w.step}. ${w.label}`,
      path: w.path,
    })),
  },
  {
    key: "repositories",
    type: "link",
    label: "Repositories",
    icon: FiDatabase,
    path: ROUTES.REPOSITORIES,
    matchPrefix: true,
  },
  { key: "reports", type: "link", label: "Reports", icon: FiBarChart2, path: ROUTES.REPORTS },
  {
    key: "admin",
    type: "dropdown",
    label: "Administration",
    icon: FiSettings,
    children: ADMIN_ROUTES,
  },
];

const matchesPath = (pathname, path, matchPrefix = false) =>
  pathname === path || (matchPrefix && pathname.startsWith(`${path}/`));

// True when the current URL belongs to this nav item (or one of its children).
export const isNavItemActive = (item, pathname) => {
  if (item.type === "dropdown") {
    return item.children.some((c) => matchesPath(pathname, c.path, true));
  }
  return matchesPath(pathname, item.path, item.matchPrefix);
};
