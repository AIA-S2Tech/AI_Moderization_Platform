// Shared SectionCard (T-05).
// A Card with a header row: title, optional subtitle and an action slot on the right.
//
// Header tones:
//   plain : white header, navy uppercase title (e.g. "APPROVED ACTIONS", "QUICK ACCESS")
//   navy  : navy header band, white text (Evidence & Certified repository panels)
//   red   : red header band, white text (Working/Generated Artifact repository panel)
//
// Props:
//   title        : header title (string or node)
//   subtitle     : optional smaller text under the title
//   actions      : optional node(s) on the right of the header, e.g. a <Button variant="outline">
//   tone         : plain | navy | red (default plain)
//   showDivider  : line under a plain header (default true; coloured headers never need it)
//   bodyPadding  : padding of the body (default "cardPadding"); use 0 for full-width tables
//   bodyProps    : extra Chakra props for the body Box
//   ...rest      : props for the outer Card (w, h, mt, etc.)
//
// Examples:
//   <SectionCard title="Quick Access">…</SectionCard>
//   <SectionCard
//     tone="navy"
//     title="Evidence Repository"
//     subtitle="Source material and client-provided evidence"
//     actions={<Button variant="outline" leftIcon={<FiUpload />}>Upload Evidence</Button>}
//     bodyPadding={0}
//   >
//     <DataTable … />
//   </SectionCard>

import React, { forwardRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "./Card";

const toneStyles = {
  plain: {
    headerBg: "bg.surface",
    titleColor: "text.primary",
    subtitleColor: "text.secondary",
    uppercase: true,
  },
  navy: {
    headerBg: "navy.800",
    titleColor: "text.inverse",
    subtitleColor: "navy.100",
    uppercase: false,
  },
  red: {
    headerBg: "red.500",
    titleColor: "text.inverse",
    subtitleColor: "red.50",
    uppercase: false,
  },
};

const SectionCard = forwardRef(function SectionCard(
  {
    title,
    subtitle,
    actions,
    tone = "plain",
    showDivider = true,
    bodyPadding = "cardPadding",
    bodyProps,
    children,
    ...rest
  },
  ref
) {
  const t = toneStyles[tone] || toneStyles.plain;
  const isPlain = !toneStyles[tone] || tone === "plain";
  const hasHeader = title || subtitle || actions;

  return (
    <Card ref={ref} padding={0} overflow="hidden" {...rest}>
      {hasHeader && (
        <Flex
          bg={t.headerBg}
          px="cardPadding"
          py={4}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          gap={3}
          borderBottom={isPlain && showDivider ? "1px solid" : undefined}
          borderColor="border.default"
        >
          <Box minW={0}>
            {title && (
              <Text
                as="h2"
                fontSize={isPlain ? "sm" : "lg"}
                fontWeight="bold"
                lineHeight="snug"
                letterSpacing={t.uppercase ? "wider" : "normal"}
                textTransform={t.uppercase ? "uppercase" : "none"}
                color={t.titleColor}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text fontSize="sm" color={t.subtitleColor} mt={1}>
                {subtitle}
              </Text>
            )}
          </Box>

          {actions && (
            <Flex gap={2} flexShrink={0} wrap="wrap">
              {actions}
            </Flex>
          )}
        </Flex>
      )}

      <Box p={bodyPadding} {...bodyProps}>
        {children}
      </Box>
    </Card>
  );
});

export default SectionCard;
