// Central Chakra UI theme – the single source of design tokens (T-02).
// Chakra also exposes every token as a CSS variable, so CSS modules can use
// e.g. var(--chakra-colors-navy-800) or var(--chakra-radii-xl).

import { extendTheme } from "@chakra-ui/react";
import { colors, semanticColors } from "./tokens/colors";
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  textStyles,
} from "./tokens/typography";
import {
  space,
  radii,
  shadows,
  breakpoints,
  sizes,
  zIndices,
} from "./tokens/layout";

const styles = {
  global: {
    // Only background on <html>. Never set fontSize on <html>: it changes what
    // 1rem means and would shrink every rem-based font size and spacing token.
    html: {
      bg: "bg.page",
    },
    body: {
      bg: "bg.page",
      color: "text.primary",
      fontFamily: "body",
      fontSize: "sm",
      lineHeight: "normal",
      WebkitFontSmoothing: "antialiased",
    },
    "*::placeholder": {
      color: "neutral.400",
    },
    "*, *::before, *::after": {
      borderColor: "border.default",
    },
    a: {
      color: "text.link",
    },
  },
};

const theme = extendTheme({
  colors,
  semanticTokens: { colors: semanticColors },
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  textStyles,
  space,
  radii,
  shadows,
  breakpoints,
  sizes,
  zIndices,
  styles,
});

export default theme;
