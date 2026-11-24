// Status → colour map used by StatusBadge (T-04).
// To add a new status, add one line here – never hard-code badge colours in pages.
//
// Each tone points at a colour group in the theme (theme/tokens/colors.js),
// which provides a soft background (bg), text colour (fg) and border.

export const STATUS_TONES = {
  success: "status.success", // green
  warning: "status.warning", // amber
  info: "status.info", // blue
  neutral: "status.neutral", // grey
  danger: "status.danger", // red
  purple: "accent.purple", // purple
  muted: "status.muted", // greyed out – not applicable (Out of Scope, Disabled, Superseded)
};

// Extra badge styles per tone (beyond colours).
export const STATUS_TONE_STYLES = {
  muted: { borderStyle: "dashed" },
};

// Keys are lower-case so lookups are case-insensitive ("In Review" = "in review").
export const STATUS_CONFIG = {
  certified: { label: "Certified", tone: "success" },
  validated: { label: "Validated", tone: "success" },
  complete: { label: "Complete", tone: "success" }, // deliverable (S2-02)
  active: { label: "Active", tone: "success" }, // scope version / project (S2-02)

  "in progress": { label: "In Progress", tone: "warning" },
  "in review": { label: "In Review", tone: "warning" },
  "pending sme": { label: "Pending SME", tone: "warning" },

  started: { label: "Started", tone: "info" },
  generated: { label: "Generated", tone: "info" },

  revised: { label: "Revised", tone: "purple" },
  "ready for certification": { label: "Ready for Certification", tone: "purple" },

  "not started": { label: "Not Started", tone: "neutral" },
  draft: { label: "Draft", tone: "neutral" }, // artifact, project, scope version

  // Not applicable – greyed out, never confused with Not Started (S2-02).
  "out of scope": { label: "Out of Scope", tone: "muted" },
  disabled: { label: "Disabled", tone: "muted" },
  superseded: { label: "Superseded", tone: "muted" },
};

// Unknown statuses fall back to neutral grey and show the text as given.
export const DEFAULT_STATUS_TONE = "neutral";

// Returns { label, tone } for any status string (safe for null / unknown values).
export const getStatusConfig = (status) => {
  const text = status == null ? "" : String(status).trim();
  const match = STATUS_CONFIG[text.toLowerCase()];
  return match || { label: text || "Unknown", tone: DEFAULT_STATUS_TONE };
};
