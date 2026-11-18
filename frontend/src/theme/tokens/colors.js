// Colour tokens for the S2Tech Modernization Platform.
// Key values come from the colour reference in
// "S2Tech_Sprint1_Task_Details_with_Images.xlsx" (T-02 row) – exact hex still to be
// confirmed with design. Components must use these tokens, never hex values.

export const colors = {
  // Brand navy – top nav, primary buttons, navy-themed workspaces/panels.
  navy: {
    50: "#E8EDF6",
    100: "#C7D2E8",
    200: "#A0B3D6",
    300: "#7491C1",
    400: "#4C70AA",
    500: "#2D5291",
    600: "#1B3F7A",
    700: "#0E2F66",
    800: "#021E56", // Brand navy (reference) – top nav background
    900: "#00143A",
  },

  // Brand red – danger buttons, red-themed workspaces/panels, alert counts.
  red: {
    50: "#FDECEE",
    100: "#F9CDD2",
    200: "#F2A3AC",
    300: "#E8747B",
    400: "#D94650",
    500: "#C61620", // Brand red (reference)
    600: "#A9131C",
    700: "#8B1017",
    800: "#6D0C12",
    900: "#4F090D",
  },

  // Alert value red (reference) – red counts/values such as "23", "3 gaps", "5 high risks".
  // Slightly different from the brand red above.
  alert: "#C8102E",

  // Neutrals – backgrounds, borders, secondary text.
  neutral: {
    0: "#FFFFFF",
    50: "#F6F8FB", // Page background (reference)
    100: "#F1F4F8", // subtle fills, table header
    200: "#E2E8F0", // borders, dividers
    300: "#CBD5E1",
    400: "#94A3B8", // placeholder, disabled text
    500: "#64748B", // muted text
    600: "#475569", // secondary text
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },

  // Status colours – each has a soft background, a strong foreground and a border.
  // StatusBadge (T-04) maps each status name to one of these.
  // Backgrounds (bg) are the reference values; text (fg) and border are matching
  // darker/lighter shades of the same colour.
  status: {
    success: { bg: "#DCFCE7", fg: "#15803D", border: "#BBF7D0" }, // Certified, Validated
    warning: { bg: "#FEF3C7", fg: "#B45309", border: "#FDE68A" }, // In Progress, In Review, Pending SME
    info: { bg: "#DBEAFE", fg: "#1D4ED8", border: "#BFDBFE" }, // Started, Generated
    neutral: { bg: "#E5E7EB", fg: "#4B5563", border: "#D1D5DB" }, // Not Started, Draft, unknown
    danger: { bg: "#FDECEE", fg: "#C8102E", border: "#F5C2C7" }, // errors, gaps, high risk
  },

  // Extra accent tones used by FlowStepper / lifecycle diagrams.
  accent: {
    purple: { bg: "#F1ECFB", fg: "#6B46C1", border: "#D6C8F2" },
    amber: { bg: "#FEF3C7", fg: "#B45309", border: "#FDE68A" },
    green: { bg: "#DCFCE7", fg: "#15803D", border: "#BBF7D0" },
  },
};

// Semantic tokens – meaningful names that point at the raw colours above.
// Prefer these in components (e.g. color="text.secondary", bg="bg.page").
export const semanticColors = {
  "brand.primary": "navy.800",
  "brand.accent": "red.500",

  "text.primary": "navy.900",
  "text.secondary": "neutral.600",
  "text.muted": "neutral.500",
  "text.inverse": "neutral.0",
  "text.link": "navy.600",
  "text.alert": "alert", // red counts / values (e.g. SME Tasks 23)

  "bg.page": "neutral.50",
  "bg.surface": "neutral.0",
  "bg.subtle": "neutral.100",
  "bg.navTint": "navy.50", // light navy tint (navy workspace cards)
  "bg.redTint": "red.50", // light red tint (red workspace cards)

  "border.default": "neutral.200",
  "border.strong": "neutral.300",
  "border.navy": "navy.200",
  "border.red": "red.200",
};
