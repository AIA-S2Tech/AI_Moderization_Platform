// Spacing, radius, shadow, breakpoint and z-index tokens.

// Spacing: Chakra's default 4px scale is used as-is (1 = 4px, 2 = 8px, 4 = 16px …).
// These named aliases cover the common layout gaps so pages stay consistent.
export const space = {
  cardPadding: "1.25rem", // 20px – inside cards / SectionCards
  sectionGap: "1.5rem", // 24px – between page sections
  gutter: "1rem", // 16px – page side padding on mobile
};

export const radii = {
  none: "0",
  sm: "4px",
  md: "6px", // buttons, inputs, badges
  lg: "8px",
  xl: "12px", // cards
  full: "9999px", // numbered circles, avatars
};

export const shadows = {
  card: "0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04)",
  cardHover: "0 4px 12px rgba(16, 24, 40, 0.08)",
  dropdown: "0 8px 24px rgba(16, 24, 40, 0.12)",
  modal: "0 20px 48px rgba(16, 24, 40, 0.18)",
  focus: "0 0 0 3px rgba(45, 82, 145, 0.35)", // navy.500 focus ring
};

// Responsive breakpoints – match the Definition of Done widths
// (375 / 768 / 1024 / 1440). lg = 1024px is where the nav collapses
// to a hamburger and the dashboard drops from 3 columns to 1.
export const breakpoints = {
  base: "0em",
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "64em", // 1024px
  xl: "90em", // 1440px
  "2xl": "96em", // 1536px
};

export const sizes = {
  container: {
    page: "1440px",
  },
  navHeight: "64px",
};

export const zIndices = {
  nav: 1100,
  dropdown: 1200,
  modal: 1400,
  toast: 1700,
};
