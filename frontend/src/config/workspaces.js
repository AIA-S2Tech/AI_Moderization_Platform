// Workspace config (T-13).
// Everything that makes the 5 methodology workspaces different lives here –
// the workspace components (T-14 – T-16) and MethodologyWorkspaceTemplate (T-17)
// read it, so each workspace page is config only.
//
// Per workspace (key = WORKSPACE_ROUTES key in config/routes.js):
//   id, number, path    : identity, step number 1–5 (PageHeader circle) and route
//   title               : short name ("Legacy Discovery") – WorkspaceHeader, dashboard
//   pageTitle           : PageHeader title ("Legacy Discovery Workspace")
//   subtitle            : one-line purpose – PageHeader and dashboard workspace card
//   theme               : navy | red – PageHeader circle, tab accent, Approved Actions
//   actions             : Approved Actions list [{ id, label, icon }]
//   summary             : { title, stats: [{ id, label, icon, format, tone? }] }
//                         format: number (1,248) | percent (64%) | text ("Fair")
//                         tone  : StatCard tone – default | red | amber | green
// Live numbers (status, % complete, stat values, artifacts) come from
// services/workspace.service.js, not from here.

import {
  FiActivity,
  FiAlertTriangle,
  FiBarChart2,
  FiBox,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiDatabase,
  FiEdit3,
  FiFileText,
  FiFilter,
  FiGitBranch,
  FiGitMerge,
  FiHelpCircle,
  FiLayers,
  FiLink,
  FiList,
  FiMap,
  FiRefreshCw,
  FiSearch,
  FiSettings,
  FiShield,
  FiShuffle,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiXCircle,
  FiZap,
} from "react-icons/fi";
import { WORKSPACE_ROUTES } from "./routes";

export const WORKSPACE_KEYS = {
  LEGACY_DISCOVERY: "legacyDiscovery",
  BUSINESS_RULE_INTELLIGENCE: "businessRuleIntelligence",
  MODERNIZATION_ASSESSMENT: "modernizationAssessment",
  TARGETED_MODERNIZATION: "targetedModernization",
  AI_CODE_TRANSFORMATION: "aiCodeTransformation",
};

// id / number / path / title come from the route list so they can never drift apart.
const fromRoute = (key) => {
  const route = WORKSPACE_ROUTES.find((w) => w.key === key) || {};
  return { id: key, number: route.step, path: route.path, title: route.label };
};

// "Generate System Overview" → { id: "generate-system-overview", label, icon }
const action = (label, icon) => ({
  id: label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  label,
  icon,
});

export const WORKSPACE_CONFIG = {
  // ── 1. Legacy Discovery ─────────────────────────────────────────────
  [WORKSPACE_KEYS.LEGACY_DISCOVERY]: {
    ...fromRoute(WORKSPACE_KEYS.LEGACY_DISCOVERY),
    pageTitle: "Legacy Discovery Workspace",
    subtitle: "Understand what exists today, how it works, and what evidence supports it.",
    theme: "navy",
    actions: [
      action("Generate System Overview", FiFileText),
      action("Generate Application Inventory", FiList),
      action("Generate Process Flow", FiGitBranch),
      action("Generate Dependency Analysis", FiLink),
      action("Generate Interface Inventory", FiLayers),
      action("Identify Evidence Gaps", FiSearch),
      action("Generate SME Questions", FiHelpCircle),
    ],
    summary: {
      title: "Evidence Summary",
      stats: [
        { id: "evidenceItems", label: "Evidence Items", icon: FiFileText, format: "number" },
        { id: "evidenceTypes", label: "Evidence Types", icon: FiLayers, format: "number" },
        { id: "coverage", label: "Coverage", icon: FiCheckCircle, format: "percent" },
        { id: "gapsIdentified", label: "Gaps Identified", icon: FiAlertTriangle, format: "number", tone: "red" },
      ],
    },
  },

  // ── 2. Business Rule Intelligence ───────────────────────────────────
  [WORKSPACE_KEYS.BUSINESS_RULE_INTELLIGENCE]: {
    ...fromRoute(WORKSPACE_KEYS.BUSINESS_RULE_INTELLIGENCE),
    pageTitle: "Business Rule Intelligence Workspace",
    subtitle: "Extract, validate and organize business rules and business intent.",
    theme: "red",
    actions: [
      action("Extract Business Rules", FiFilter),
      action("Generate Rule Traceability", FiLink),
      action("Identify Conflicting Rules", FiShuffle),
      action("Identify Unconfirmed Rules", FiHelpCircle),
      action("Generate Decision Tables", FiList),
      action("Generate SME Validation Package", FiUsers),
      action("Generate Test Scenarios", FiCheckCircle),
    ],
    summary: {
      title: "Validation Summary",
      stats: [
        { id: "rulesExtracted", label: "Rules Extracted", icon: FiFileText, format: "number" },
        { id: "validatedBySmes", label: "Validated by SMEs", icon: FiCheckCircle, format: "percent" },
        { id: "unresolvedRules", label: "Unresolved Rules", icon: FiXCircle, format: "number" },
        { id: "smeTasks", label: "SME Tasks", icon: FiUsers, format: "number" },
      ],
    },
  },

  // ── 3. Modernization Assessment ─────────────────────────────────────
  [WORKSPACE_KEYS.MODERNIZATION_ASSESSMENT]: {
    ...fromRoute(WORKSPACE_KEYS.MODERNIZATION_ASSESSMENT),
    pageTitle: "Modernization Assessment Workspace",
    subtitle: "Assess what should change and the impact of options.",
    theme: "navy",
    actions: [
      action("Identify Change Candidates", FiTarget),
      action("Assess Technical Condition", FiActivity),
      action("Assess Business Impact", FiTrendingUp),
      action("Analyze Modernization Options", FiShuffle),
      action("Risk & Effort Assessment", FiShield),
      action("Generate Assessment Report", FiFileText),
    ],
    summary: {
      title: "Assessment Snapshot",
      stats: [
        { id: "changeCandidates", label: "Change Candidates", icon: FiTarget, format: "number" },
        { id: "optionsEvaluated", label: "Options Evaluated", icon: FiShuffle, format: "number" },
        { id: "highRisks", label: "High Risks", icon: FiAlertTriangle, format: "number", tone: "red" },
        { id: "dataQuality", label: "Data Quality", icon: FiDatabase, format: "text", tone: "amber" },
      ],
    },
  },

  // ── 4. Targeted Modernization ───────────────────────────────────────
  [WORKSPACE_KEYS.TARGETED_MODERNIZATION]: {
    ...fromRoute(WORKSPACE_KEYS.TARGETED_MODERNIZATION),
    pageTitle: "Targeted Modernization Workspace",
    subtitle: "Define the right modernization path and sequence.",
    theme: "red",
    actions: [
      action("Define Modernization Path", FiMap),
      action("Define Sequence & Phases", FiLayers),
      action("Identify Reuse Opportunities", FiRefreshCw),
      action("Integration Strategy", FiGitMerge),
      action("Data Migration Strategy", FiDatabase),
      action("Generate Roadmap", FiBarChart2),
    ],
    summary: {
      title: "Workspace Summary",
      stats: [
        { id: "plansDefined", label: "Plans Defined", icon: FiFileText, format: "number" },
        { id: "phasesDefined", label: "Phases Defined", icon: FiLayers, format: "number" },
        { id: "reuseOpportunities", label: "Reuse Opportunities", icon: FiRefreshCw, format: "number" },
        { id: "roadmapCreated", label: "Roadmap Created", icon: FiMap, format: "number" },
      ],
    },
  },

  // ── 5. AI-Assisted Code Transformation ──────────────────────────────
  [WORKSPACE_KEYS.AI_CODE_TRANSFORMATION]: {
    ...fromRoute(WORKSPACE_KEYS.AI_CODE_TRANSFORMATION),
    pageTitle: "AI-Assisted Code Transformation Workspace",
    subtitle: "Accelerate code transformation with AI under human control.",
    theme: "navy",
    actions: [
      action("Analyze Code", FiCode),
      action("Generate Code Explanations", FiFileText),
      action("Identify Refactoring Opportunities", FiSearch),
      action("Generate Unit Test Cases", FiCheckCircle),
      action("Generate Code Conversion Plan", FiMap),
      action("Accelerate Code Transformation", FiZap),
      action("Review & Validate Code Changes", FiShield),
    ],
    summary: {
      title: "Transformation Snapshot",
      stats: [
        { id: "codeAnalyzed", label: "Code Analyzed", icon: FiCpu, format: "number" },
        { id: "refactoringIdeas", label: "Refactoring Ideas", icon: FiBox, format: "number" },
        { id: "testsGenerated", label: "Tests Generated", icon: FiCheckCircle, format: "number" },
        { id: "codeConverted", label: "Code Converted", icon: FiShuffle, format: "number" },
      ],
    },
  },
};

// ── Shared by every workspace (MethodologyWorkspaceTemplate, T-17 – T-20) ──

// Workspace tabs, in order. `type` tells the template what to render:
//   overview    : WorkspaceOverviewTab (T-18)
//   actions     : Approved Actions + Recent Artifacts + summary row (T-17)
//   repository  : RepositoryPanel, compact, filtered to the capability (T-19)
//   placeholder : EmptyState until the workspace APIs arrive (T-20)
export const WORKSPACE_TABS = [
  { id: "overview", label: "Overview", type: "overview" },
  { id: "actions", label: "Actions", type: "actions" },
  { id: "artifacts", label: "Artifacts", type: "repository", repository: "artifacts" },
  { id: "evidence", label: "Evidence", type: "repository", repository: "evidence" },
  {
    id: "sme-tasks",
    label: "SME Tasks",
    type: "placeholder",
    icon: FiUsers,
    title: "Coming in the next sprint",
    message: "SME questions and validation tasks for this capability will be listed here.",
  },
  {
    id: "issues",
    label: "Issues",
    type: "placeholder",
    icon: FiAlertTriangle,
    title: "Coming in the next sprint",
    message: "Open issues and assumptions for this capability will be listed here.",
  },
];

export const DEFAULT_WORKSPACE_TAB = "actions";

// Artifact Lifecycle (applies across all capabilities) – Overview tab, FlowStepper steps.
export const ARTIFACT_LIFECYCLE = [
  { icon: FiFileText, title: "Generated", description: "AI workflow completed", tone: "navy" },
  { icon: FiEdit3, title: "Professional Review", description: "Technical review by practitioner", tone: "navy" },
  { icon: FiGitMerge, title: "SME / Technical Validation", description: "SME validation in progress", tone: "navy" },
  { icon: FiShield, title: "Certified", description: "Approved and traceable", tone: "green" },
  { icon: FiSettings, title: "Decision-Ready", description: "Ready for decision or handoff", tone: "green" },
];

// In methodology order (1 → 5) – for the dashboard and any list of workspaces.
export const WORKSPACE_LIST = WORKSPACE_ROUTES.map((w) => WORKSPACE_CONFIG[w.key]).filter(Boolean);

export const getWorkspaceConfig = (id) => WORKSPACE_CONFIG[id] || null;
