import React, { Fragment } from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

// Colours per step tone. Theme tokens only.
// soft  : light tint + border (Artifact Lifecycle)
// solid : solid colour + white text (Recommended Use and Flow)
const TONES = {
  navy: { bg: "bg.navTint", border: "border.navy", accent: "navy.700", solid: "navy.800" },
  purple: { bg: "accent.purple.bg", border: "accent.purple.border", accent: "accent.purple.fg", solid: "accent.purple.fg" },
  red: { bg: "bg.redTint", border: "border.red", accent: "red.500", solid: "red.500" },
  amber: { bg: "accent.amber.bg", border: "accent.amber.border", accent: "accent.amber.fg", solid: "accent.amber.fg" },
  green: { bg: "accent.green.bg", border: "accent.green.border", accent: "accent.green.fg", solid: "accent.green.fg" },
};

const SoftStep = ({ icon, title, description, t }) => (
  <Flex
    flex="1"
    align="flex-start"
    gap={3}
    p={4}
    bg={t.bg}
    border="1px solid"
    borderColor={t.border}
    borderRadius="lg"
  >
    {icon && (
      <Flex
        align="center"
        justify="center"
        boxSize="40px"
        borderRadius="full"
        bg="bg.surface"
        color={t.accent}
        flexShrink={0}
      >
        <Icon as={icon} boxSize="20px" aria-hidden="true" />
      </Flex>
    )}
    <Box minW={0}>
      <Text fontSize="sm" fontWeight="bold" color="text.primary">
        {title}
      </Text>
      {description && (
        <Text fontSize="xs" color="text.secondary" mt={1}>
          {description}
        </Text>
      )}
    </Box>
  </Flex>
);

const SolidStep = ({ title, description, t }) => (
  <Flex
    flex="1"
    direction="column"
    align="center"
    justify="center"
    textAlign="center"
    minH="96px"
    p={4}
    bg={t.solid}
    color="text.inverse"
    borderRadius="lg"
  >
    <Text fontSize="md" fontWeight="bold">
      {title}
    </Text>
    {description && (
      <Text fontSize="sm" mt={1}>
        ({description})
      </Text>
    )}
  </Flex>
);

// Steps joined by arrows: across on tablet/desktop, top-to-bottom on mobile. e.g.
// <FlowStepper steps={[
//   { icon: FiFileText, title: "Generated", description: "AI workflow completed", tone: "navy" },
//   { icon: FiShield, title: "Certified", description: "Approved and traceable", tone: "green" },
// ]} />
// <FlowStepper variant="solid" steps={[
//   { title: "Client / Project Evidence", description: "Upload and Organize", tone: "navy" },
//   { title: "AI Processing and Working Artifacts", description: "Generate, Review, Refine", tone: "red" },
// ]} />
const FlowStepper = ({ steps = [], variant = "soft" }) => {
  const isSolid = variant === "solid";
  const StepBox = isSolid ? SolidStep : SoftStep;
  // Solid flow uses bigger, filled arrows (as in the mockup).
  const arrow = isSolid
    ? { down: FaArrowDown, right: FaArrowRight, size: "28px" }
    : { down: FiArrowDown, right: FiArrowRight, size: "20px" };

  return (
    <Flex
      as="ol"
      listStyleType="none"
      direction={{ base: "column", md: "row" }}
      wrap={{ md: "wrap" }}
      align="stretch"
      gap={3}
    >
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          <Box as="li" display="flex" flex="1" minW={{ md: "180px" }}>
            <StepBox {...step} t={TONES[step.tone] || TONES.navy} />
          </Box>
          {index < steps.length - 1 && (
            <Flex align="center" justify="center" color="navy.800" aria-hidden="true">
              <Icon as={arrow.down} boxSize={arrow.size} strokeWidth={3} display={{ base: "block", md: "none" }} />
              <Icon as={arrow.right} boxSize={arrow.size} strokeWidth={3} display={{ base: "none", md: "block" }} />
            </Flex>
          )}
        </Fragment>
      ))}
    </Flex>
  );
};

export default FlowStepper;
