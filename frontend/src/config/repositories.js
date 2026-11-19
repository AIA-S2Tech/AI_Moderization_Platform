// Repository config (T-12).
// Everything that makes the 3 repository panels different lives here –
// RepositoryPanel (T-11) reads it, so the pages are config only.
//
// Per repository:
//   title, subtitle, tone      : SectionCard header (tone navy | red)
//   path                       : full page route (the hub links to it)
//   action                     : header button { id, label, icon }; the page handles the click
//   itemLabel                  : word used in "Showing 1 - 10 of 24 items"
//   searchPlaceholder          : text in the search box
//   searchFields               : column keys the search box looks in
//   columns                    : every column the repository can show
//       { key, header, type?, width?, sortable? }
//       type: text (default) | file (FileTypeIcon + name) | status (StatusBadge)
//             | date (MM/DD/YYYY) | capability (workspace label)
//   defaultColumns             : column keys shown on most tabs, in order
//   defaultSort                : { key, direction } used by tabs without their own sort
//   tabs                       : [{ id, label, sort?, columns? }] – a tab can change the
//                                sort and / or the columns (e.g. "Metadata", "By Owner")
//   filters                    : [{ key, label, options? }] – label is plural ("Types" →
//                                "All Types"). Without options, they come from the data.
//   rowActions                 : ⋮ menu items [{ id, label }]; the page handles the click
//   empty                      : { title, message } when the repository has no items
//   info                       : { number, items } – numbered info panel under the page
//                                (InfoListCard, title & tone from above)

import { FiPlus } from "react-icons/fi";
import { ROUTES, WORKSPACE_ROUTES } from "./routes";

export const REPOSITORY_KEYS = {
  EVIDENCE: "evidence",
  ARTIFACTS: "artifacts",
  CERTIFIED: "certified",
};

// { value: "legacyDiscovery", label: "Legacy Discovery" } … for the capability filter.
export const CAPABILITY_OPTIONS = WORKSPACE_ROUTES.map((w) => ({ value: w.key, label: w.label }));

export const getCapabilityLabel = (key) =>
  (WORKSPACE_ROUTES.find((w) => w.key === key) || {}).label || key || "";

const commonRowActions = [
  { id: "view", label: "View" },
  { id: "download", label: "Download" },
];

export const REPOSITORY_CONFIG = {
  // ── 1. Evidence Repository ──────────────────────────────────────────
  [REPOSITORY_KEYS.EVIDENCE]: {
    key: REPOSITORY_KEYS.EVIDENCE,
    title: "Evidence Repository",
    subtitle: "Source code, documents, and other project evidence",
    tone: "navy",
    path: ROUTES.EVIDENCE_REPOSITORY,
    action: { id: "upload", label: "Upload Evidence", icon: FiPlus },
    itemLabel: "items",
    searchPlaceholder: "Search evidence...",
    searchFields: ["name", "type", "source"],
    columns: [
      { key: "name", header: "Name", type: "file", sortable: true },
      { key: "type", header: "Type", sortable: true },
      { key: "source", header: "Source", sortable: true },
      { key: "dateAdded", header: "Date Added", type: "date", sortable: true },
      { key: "status", header: "Status", type: "status", sortable: true },
      // Metadata tab
      { key: "classification", header: "Classification", sortable: true },
      { key: "version", header: "Version", sortable: true },
      { key: "capability", header: "Capability", type: "capability", sortable: true },
    ],
    defaultColumns: ["name", "type", "source", "dateAdded", "status"],
    defaultSort: { key: "dateAdded", direction: "desc" },
    tabs: [
      { id: "all", label: "All Evidence" },
      { id: "type", label: "By Type", sort: { key: "type", direction: "asc" } },
      { id: "source", label: "By Source", sort: { key: "source", direction: "asc" } },
      { id: "date", label: "By Date", sort: { key: "dateAdded", direction: "desc" } },
      {
        id: "metadata",
        label: "Metadata",
        columns: ["name", "classification", "version", "capability", "dateAdded"],
      },
    ],
    filters: [
      { key: "type", label: "Types" },
      { key: "source", label: "Sources" },
    ],
    rowActions: [...commonRowActions, { id: "edit-metadata", label: "Edit Metadata" }],
    empty: { title: "No evidence yet", message: "Upload source code, documents and other project evidence." },
    info: {
      number: 1,
      items: [
        "Stores all source evidence provided by the client or gathered by the team.",
        "Includes code, documents, requirements, architecture diagrams, data models, procedures, policies, tests, and meeting notes.",
        "Each item includes metadata (source, date, classification, version).",
        "Evidence can be organized by type, source, or methodology capability.",
        "Evidence remains in this repository throughout the project.",
      ],
    },
  },

  // ── 2. Working / Generated Artifact Repository ──────────────────────
  [REPOSITORY_KEYS.ARTIFACTS]: {
    key: REPOSITORY_KEYS.ARTIFACTS,
    title: "Working/Generated Artifact Repository",
    subtitle: "AI-generated and practitioner working artifacts",
    tone: "red",
    path: ROUTES.ARTIFACT_REPOSITORY,
    action: { id: "new-folder", label: "New Folder", icon: FiPlus },
    itemLabel: "items",
    searchPlaceholder: "Search artifacts...",
    searchFields: ["name", "capability", "owner"],
    columns: [
      { key: "name", header: "Name", type: "file", sortable: true },
      { key: "capability", header: "Capability", type: "capability", sortable: true },
      { key: "version", header: "Version", sortable: true },
      { key: "status", header: "Status", type: "status", sortable: true },
      { key: "lastUpdated", header: "Last Updated", type: "date", sortable: true },
      // By Owner tab
      { key: "owner", header: "Owner", sortable: true },
    ],
    defaultColumns: ["name", "capability", "version", "status", "lastUpdated"],
    defaultSort: { key: "lastUpdated", direction: "desc" },
    tabs: [
      { id: "all", label: "All Artifacts" },
      { id: "capability", label: "By Capability", sort: { key: "capability", direction: "asc" } },
      { id: "status", label: "By Status", sort: { key: "status", direction: "asc" } },
      {
        id: "owner",
        label: "By Owner",
        sort: { key: "owner", direction: "asc" },
        columns: ["name", "owner", "capability", "status", "lastUpdated"],
      },
      { id: "date", label: "By Date", sort: { key: "lastUpdated", direction: "desc" } },
    ],
    filters: [
      { key: "capability", label: "Capabilities", options: CAPABILITY_OPTIONS },
      { key: "status", label: "Statuses" },
    ],
    rowActions: [...commonRowActions, { id: "submit-review", label: "Submit for Review" }],
    empty: { title: "No artifacts yet", message: "Start by running an approved action in a workspace." },
    info: {
      number: 2,
      items: [
        "Stores AI-generated outputs and practitioner working artifacts.",
        "Includes draft deliverables, intermediate outputs, analysis results, and working documents.",
        "Items move through a validation lifecycle (Generated → In Review → Revised → Ready for Certification).",
        "Multiple versions are maintained.",
        "Artifacts in this repository are not yet certified and should not be treated as approved project knowledge.",
      ],
    },
  },

  // ── 3. Certified Knowledge Repository ───────────────────────────────
  [REPOSITORY_KEYS.CERTIFIED]: {
    key: REPOSITORY_KEYS.CERTIFIED,
    title: "Certified Knowledge Repository",
    subtitle: "Validated and approved project knowledge",
    tone: "navy",
    path: ROUTES.CERTIFIED_REPOSITORY,
    action: { id: "add-certified", label: "Add Certified Item", icon: FiPlus },
    itemLabel: "items",
    searchPlaceholder: "Search knowledge...",
    searchFields: ["name", "capability", "type"],
    columns: [
      { key: "name", header: "Name", type: "file", sortable: true },
      { key: "capability", header: "Capability", type: "capability", sortable: true },
      { key: "type", header: "Type", sortable: true },
      { key: "version", header: "Version", sortable: true },
      { key: "certifiedDate", header: "Certified Date", type: "date", sortable: true },
    ],
    defaultColumns: ["name", "capability", "type", "version", "certifiedDate"],
    defaultSort: { key: "certifiedDate", direction: "desc" },
    tabs: [
      { id: "all", label: "All Knowledge" },
      { id: "capability", label: "By Capability", sort: { key: "capability", direction: "asc" } },
      { id: "type", label: "By Type", sort: { key: "type", direction: "asc" } },
      { id: "version", label: "By Version", sort: { key: "version", direction: "desc" } },
      { id: "date", label: "By Date", sort: { key: "certifiedDate", direction: "desc" } },
    ],
    filters: [
      { key: "capability", label: "Capabilities", options: CAPABILITY_OPTIONS },
      { key: "type", label: "Types" },
    ],
    rowActions: [...commonRowActions, { id: "traceability", label: "View Traceability" }],
    empty: { title: "No certified knowledge yet", message: "Items appear here once they are validated and certified." },
  },
};

export const getRepositoryConfig = (key) => REPOSITORY_CONFIG[key] || null;
