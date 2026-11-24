// Shared WizardStepper (S2-03).
// Numbered steps with › between them, for any multi-step flow, e.g. Create project:
//   1 Project details › 2 Configure scope › 3 Review & activate
// Steps before the current one are "done" (tick) and can be clicked to go back;
// later steps are "upcoming" and cannot be clicked (finish the current step first).
//
// Props:
//   steps       : [{ id, label }] in order
//   currentStep : id of the step being shown
//   onStepClick : optional (stepId) => void – called for a done step; without it
//                 done steps are shown but not clickable
//   ...rest     : props for the outer <nav> (mb, etc.)
//
// Example:
//   <WizardStepper
//     steps={[{ id: "details", label: "Project details" }, { id: "scope", label: "Configure scope" },
//             { id: "review", label: "Review & activate" }]}
//     currentStep="scope"
//     onStepClick={(id) => navigate(stepPaths[id])}
//   />

import React from "react";
import { Box, Flex, Icon, Text, VisuallyHidden, chakra } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

// Circle + label colours per state. Theme tokens only.
const STATE_STYLES = {
  done: {
    circle: { bg: "bg.surface", color: "navy.800", borderColor: "navy.800" },
    label: { color: "text.primary", fontWeight: "semibold" },
  },
  current: {
    circle: { bg: "navy.800", color: "text.inverse", borderColor: "navy.800" },
    label: { color: "text.primary", fontWeight: "bold" },
  },
  upcoming: {
    circle: { bg: "bg.surface", color: "text.muted", borderColor: "border.strong" },
    label: { color: "text.muted", fontWeight: "semibold" },
  },
};

const STATE_TEXT = { done: "completed", current: "current step", upcoming: "not started" };

const StepContent = ({ number, label, state }) => {
  const s = STATE_STYLES[state];
  return (
    <>
      <Flex
        as="span"
        align="center"
        justify="center"
        boxSize="24px"
        flexShrink={0}
        borderRadius="full"
        border="2px solid"
        fontSize="xs"
        fontWeight="bold"
        {...s.circle}
      >
        {state === "done" ? <Icon as={FiCheck} boxSize="14px" aria-hidden="true" /> : number}
      </Flex>
      <Text as="span" fontSize={{ base: "sm", md: "md" }} {...s.label}>
        {label}
      </Text>
      <VisuallyHidden>{`(step ${number}, ${STATE_TEXT[state]})`}</VisuallyHidden>
    </>
  );
};

const WizardStepper = ({ steps = [], currentStep, onStepClick, ...rest }) => {
  const currentIndex = Math.max(0, steps.findIndex((step) => step.id === currentStep));

  return (
    <Box as="nav" aria-label="Progress" {...rest}>
      <Flex as="ol" listStyleType="none" m={0} p={0} align="center" wrap="wrap" columnGap={3} rowGap={2}>
        {steps.map((step, index) => {
          let state = "upcoming";
          if (index < currentIndex) state = "done";
          else if (index === currentIndex) state = "current";
          const isClickable = state === "done" && Boolean(onStepClick);
          const content = <StepContent number={index + 1} label={step.label} state={state} />;

          return (
            <Flex as="li" key={step.id} align="center" columnGap={3}>
              {index > 0 && (
                <Text as="span" aria-hidden="true" color="text.muted" fontSize="lg" lineHeight={1}>
                  ›
                </Text>
              )}
              <Flex align="center" aria-current={state === "current" ? "step" : undefined}>
                {isClickable ? (
                  <chakra.button
                    type="button"
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    borderRadius="md"
                    px={1}
                    mx={-1}
                    onClick={() => onStepClick(step.id)}
                    _hover={{ "& > span:nth-of-type(2)": { textDecoration: "underline" } }}
                    _focusVisible={{ boxShadow: "focus", outline: "none" }}
                  >
                    {content}
                  </chakra.button>
                ) : (
                  <Flex as="span" align="center" gap={2}>
                    {content}
                  </Flex>
                )}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default WizardStepper;
