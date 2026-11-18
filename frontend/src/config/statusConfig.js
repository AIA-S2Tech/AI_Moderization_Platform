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
};

// Keys are lower-case so lookups are case-insensitive ("In Review" = "in review").
export const STATUS_CONFIG = {
  certified: { label: "Certified", tone: "success" },
  validated: { label: "Validated", tone: "success" },

  "in progress": { label: "In Progress", tone: "warning" },
  "in review": { label: "In Review", tone: "warning" },
  "pending sme": { label: "Pending SME", tone: "warning" },

  started: { label: "Started", tone: "info" },
  generated: { label: "Generated", tone: "info" },

  revised: { label: "Revised", tone: "purple" },
  "ready for certification": { label: "Ready for Certification", tone: "purple" },

  "not started": { label: "Not Started", tone: "neutral" },
  draft: { label: "Draft", tone: "neutral" },
};

// Unknown statuses fall back to neutral grey and show the text as given.
export const DEFAULT_STATUS_TONE = "neutral";

// Returns { label, tone } for any status string (safe for null / unknown values).
export const getStatusConfig = (status) => {
  const text = status == null ? "" : String(status).trim();
  const match = STATUS_CONFIG[text.toLowerCase()];
  return match || { label: text || "Unknown", tone: DEFAULT_STATUS_TONE };
};
