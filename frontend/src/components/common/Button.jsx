// Shared Button (T-03).
// One button for the whole app – pages never style raw Chakra buttons.
//
// Variants : primary (navy) | danger (red) | outline (white button on a coloured
//            header, e.g. "+ Upload Evidence") | ghost (no background)
// Icon-only: pass `icon` with no children, plus an `aria-label`.
// Sizes    : sm | md
// Tone     : navy | red – colour of the text/icon for outline & ghost buttons.
//            Default navy – the mockup uses navy text even on red headers
//            ("+ New Folder"); use tone="red" only where red text is wanted.
// States   : isDisabled, isLoading (+ optional loadingText)
//
// Examples:
//   <Button>Save</Button>
//   <Button variant="danger" leftIcon={<FiTrash2 />}>Delete</Button>
//   <Button variant="outline" leftIcon={<FiPlus />}>New Folder</Button>
//   <Button variant="ghost" icon={<FiFilter />} aria-label="Filter" />
//   <Button isLoading loadingText="Saving…">Save</Button>

import React, { forwardRef } from "react";
import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
} from "@chakra-ui/react";

// Disabled look shared by every variant – hover/active must not change colour.
const disabledStyle = {
  opacity: 0.5,
  cursor: "not-allowed",
  boxShadow: "none",
};

const toneColors = {
  navy: { text: "navy.800", hoverBg: "navy.50", activeBg: "navy.100" },
  red: { text: "red.500", hoverBg: "red.50", activeBg: "red.100" },
};

// Returns the Chakra style props for a variant + tone.
const getVariantStyles = (variant, tone) => {
  const t = toneColors[tone] || toneColors.navy;

  switch (variant) {
    case "danger":
      return {
        bg: "red.500",
        color: "text.inverse",
        border: "1px solid",
        borderColor: "red.500",
        _hover: { bg: "red.600", borderColor: "red.600", _disabled: { bg: "red.500" } },
        _active: { bg: "red.700", borderColor: "red.700" },
      };

    case "outline":
      return {
        bg: "bg.surface",
        color: t.text,
        border: "1px solid",
        borderColor: "border.default",
        _hover: { bg: t.hoverBg, _disabled: { bg: "bg.surface" } },
        _active: { bg: t.activeBg },
      };

    case "ghost":
      return {
        bg: "transparent",
        color: t.text,
        border: "1px solid transparent",
        _hover: { bg: t.hoverBg, _disabled: { bg: "transparent" } },
        _active: { bg: t.activeBg },
      };

    case "primary":
    default:
      return {
        bg: "navy.800",
        color: "text.inverse",
        border: "1px solid",
        borderColor: "navy.800",
        _hover: { bg: "navy.700", borderColor: "navy.700", _disabled: { bg: "navy.800" } },
        _active: { bg: "navy.900", borderColor: "navy.900" },
      };
  }
};

const sizeStyles = {
  sm: { h: "32px", minW: "32px", px: 3, fontSize: "xs", iconSize: "14px" },
  md: { h: "40px", minW: "40px", px: 4, fontSize: "sm", iconSize: "16px" },
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    tone = "navy",
    icon,
    leftIcon,
    rightIcon,
    isLoading = false,
    loadingText,
    isDisabled = false,
    fullWidth = false,
    type = "button",
    children,
    ...rest
  },
  ref
) {
  const s = sizeStyles[size] || sizeStyles.md;

  const commonProps = {
    ref,
    type,
    isLoading,
    isDisabled,
    h: s.h,
    minW: s.minW,
    fontSize: s.fontSize,
    fontWeight: "semibold",
    borderRadius: "md",
    transition: "background-color 0.15s ease, border-color 0.15s ease",
    _focusVisible: { boxShadow: "focus", outline: "none" },
    _disabled: disabledStyle,
    sx: { "& svg": { width: s.iconSize, height: s.iconSize } },
    ...getVariantStyles(variant, tone),
    ...rest,
  };

  // Icon-only button (filter, kebab menu …). Needs an aria-label for screen readers.
  if (icon && !children) {
    if (process.env.NODE_ENV !== "production" && !rest["aria-label"]) {
      // eslint-disable-next-line no-console
      console.warn("Button: icon-only buttons need an `aria-label`.");
    }
    return <ChakraIconButton icon={icon} p={0} {...commonProps} />;
  }

  return (
    <ChakraButton
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      loadingText={loadingText}
      px={s.px}
      w={fullWidth ? "100%" : undefined}
      {...commonProps}
    >
      {children}
    </ChakraButton>
  );
});

export default Button;
