
export const ROUTES = {
  // Public
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  CONTACT_US: "/contact-us",

  // Home
  ROOT: "/",
  DASHBOARD: "/dashboard",

  // Methodology workspaces (5)
  LEGACY_DISCOVERY: "/workspaces/legacy-discovery",
  BUSINESS_RULE_INTELLIGENCE: "/workspaces/business-rule-intelligence",
  MODERNIZATION_ASSESSMENT: "/workspaces/modernization-assessment",
  TARGETED_MODERNIZATION: "/workspaces/targeted-modernization",
  AI_CODE_TRANSFORMATION: "/workspaces/ai-code-transformation",

  // Repositories (hub + 3)
  REPOSITORIES: "/repositories",
  EVIDENCE_REPOSITORY: "/repositories/evidence",
  ARTIFACT_REPOSITORY: "/repositories/artifacts",
  CERTIFIED_REPOSITORY: "/repositories/certified",

  // Top-nav sections not in Sprint 1 scope (placeholder pages only)
  PROJECTS: "/projects",
  REPORTS: "/reports",
  ADMIN_USERS: "/admin/users",
  ADMIN_SETTINGS: "/admin/settings",
  PROFILE: "/profile",

  // TopNav actions (T-40)
  SEARCH: "/search",
  HELP: "/help",

  // Internal – shared component showcase (page built in T-07)
  DEV_UI_KIT: "/dev/ui-kit",
};

// The 5 methodology workspaces, in methodology order.
// Used by the TopNav dropdown, Dashboard workspace list and Breadcrumb.
export const WORKSPACE_ROUTES = [
  { key: "legacyDiscovery", step: 1, label: "Legacy Discovery", path: ROUTES.LEGACY_DISCOVERY },
  { key: "businessRuleIntelligence", step: 2, label: "Business Rule Intelligence", path: ROUTES.BUSINESS_RULE_INTELLIGENCE },
  { key: "modernizationAssessment", step: 3, label: "Modernization Assessment", path: ROUTES.MODERNIZATION_ASSESSMENT },
  { key: "targetedModernization", step: 4, label: "Targeted Modernization", path: ROUTES.TARGETED_MODERNIZATION },
  { key: "aiCodeTransformation", step: 5, label: "AI-Assisted Code Transformation", path: ROUTES.AI_CODE_TRANSFORMATION },
];

export const REPOSITORY_ROUTES = [
  { key: "evidence", label: "Evidence Repository", path: ROUTES.EVIDENCE_REPOSITORY },
  { key: "artifacts", label: "Working / Generated Artifact Repository", path: ROUTES.ARTIFACT_REPOSITORY },
  { key: "certified", label: "Certified Knowledge Repository", path: ROUTES.CERTIFIED_REPOSITORY },
];

export const ADMIN_ROUTES = [
  { key: "users", label: "Users & Roles", path: ROUTES.ADMIN_USERS },
  { key: "settings", label: "Project Settings", path: ROUTES.ADMIN_SETTINGS },
];

// Every authenticated page. `parent` is the path of the parent page, so the
// Breadcrumb (T-42) can walk up the tree: Home › Repositories › Evidence Repository.
// `component` is the key AppRoutes uses to pick the page element.
export const PRIVATE_PAGES = [
  { path: ROUTES.DASHBOARD, title: "Project Workspace (Home)", breadcrumb: "Home", parent: null },

  ...WORKSPACE_ROUTES.map((w) => ({
    path: w.path,
    title: `${w.label} Workspace`,
    breadcrumb: w.label,
    parent: ROUTES.DASHBOARD,
  })),

  { path: ROUTES.REPOSITORIES, title: "Project Repositories", breadcrumb: "Repositories", parent: ROUTES.DASHBOARD },
  ...REPOSITORY_ROUTES.map((r) => ({
    path: r.path,
    title: r.label,
    breadcrumb: r.label,
    parent: ROUTES.REPOSITORIES,
  })),

  { path: ROUTES.PROJECTS, title: "Projects", breadcrumb: "Projects", parent: ROUTES.DASHBOARD },
  { path: ROUTES.REPORTS, title: "Reports", breadcrumb: "Reports", parent: ROUTES.DASHBOARD },
  ...ADMIN_ROUTES.map((a) => ({
    path: a.path,
    title: a.label,
    breadcrumb: a.label,
    parent: ROUTES.DASHBOARD,
  })),
  { path: ROUTES.PROFILE, title: "My Profile", breadcrumb: "Profile", parent: ROUTES.DASHBOARD },
  { path: ROUTES.SEARCH, title: "Search Results", breadcrumb: "Search", parent: ROUTES.DASHBOARD },
  { path: ROUTES.HELP, title: "Help & Support", breadcrumb: "Help", parent: ROUTES.DASHBOARD },
  { path: ROUTES.DEV_UI_KIT, title: "UI Kit (internal)", breadcrumb: "UI Kit", parent: ROUTES.DASHBOARD },
];

export const findPageByPath = (pathname) =>
  PRIVATE_PAGES.find((p) => p.path === pathname) || null;

// Breadcrumb trail for a URL : walks up the `parent` chain from the
// current page to Home. Returns [{ label, path }] from Home → current page,
// or [] for a path that is not in PRIVATE_PAGES (e.g. the 404 page).
export const getBreadcrumbTrail = (pathname) => {
  // Ignore a trailing slash so "/repositories/" matches "/repositories".
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const trail = [];
  let page = findPageByPath(cleanPath);
  while (page && trail.length < PRIVATE_PAGES.length) {
    trail.unshift({ label: page.breadcrumb, path: page.path });
    page = page.parent ? findPageByPath(page.parent) : null;
  }
  return trail;
};
