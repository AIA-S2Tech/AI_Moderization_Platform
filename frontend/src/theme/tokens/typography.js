// Typography tokens. Poppins is the existing app font, kept for consistency.

export const fonts = {
  heading: `'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif`,
  body: `'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif`,
  mono: `'SFMono-Regular', Consolas, 'Liberation Mono', monospace`,
};

// Font sizes (rem, 1rem = 16px).
export const fontSizes = {
  "2xs": "0.6875rem", // 11px – tiny meta (Last updated …)
  xs: "0.75rem", // 12px – badges, captions
  sm: "0.875rem", // 14px – table cells, body small
  md: "1rem", // 16px – body
  lg: "1.125rem", // 18px – card titles
  xl: "1.25rem", // 20px – section titles
  "2xl": "1.5rem", // 24px – stat values, page titles
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
};

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const lineHeights = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
};

export const letterSpacings = {
  normal: "0",
  wide: "0.02em",
  wider: "0.05em", // uppercase section headers
};

// Named text styles – use with <Text textStyle="sectionTitle">.
export const textStyles = {
  pageTitle: {
    fontSize: ["xl", "2xl"],
    fontWeight: "bold",
    lineHeight: "tight",
    color: "text.primary",
    textTransform: "uppercase",
  },
  pageSubtitle: {
    fontSize: "sm",
    fontWeight: "normal",
    color: "text.secondary",
  },
  // e.g. "PROJECT DASHBOARD", "METHODOLOGY WORKSPACES", "QUICK ACCESS"
  sectionTitle: {
    fontSize: "sm",
    fontWeight: "bold",
    letterSpacing: "wider",
    textTransform: "uppercase",
    color: "text.primary",
  },
  cardTitle: {
    fontSize: "md",
    fontWeight: "semibold",
    lineHeight: "snug",
    color: "text.primary",
  },
  body: {
    fontSize: "sm",
    fontWeight: "normal",
    lineHeight: "normal",
    color: "text.primary",
  },
  caption: {
    fontSize: "xs",
    fontWeight: "normal",
    color: "text.muted",
  },
  label: {
    fontSize: "xs",
    fontWeight: "medium",
    color: "text.secondary",
  },
  statValue: {
    fontSize: "xl",
    fontWeight: "bold",
    lineHeight: "tight",
    color: "text.primary",
  },
  tableHeader: {
    fontSize: "sm",
    fontWeight: "semibold",
    color: "text.primary",
  },
};
