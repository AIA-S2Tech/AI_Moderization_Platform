// UI Kit demo – WizardStepper (S2-03).

import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import WizardStepper from "../../../../components/common/WizardStepper";
import Button from "../../../../components/common/Button";
import { DemoSection, DemoRow } from "../DemoSection";

// Create project flow (Project Scope concept, screen 1).
const SETUP_STEPS = [
  { id: "details", label: "Project details" },
  { id: "scope", label: "Configure scope" },
  { id: "review", label: "Review & activate" },
];

const WizardStepperDemo = () => {
  const [current, setCurrent] = useState("scope");
  const index = SETUP_STEPS.findIndex((s) => s.id === current);
  const next = SETUP_STEPS[index + 1];

  return (
    <DemoSection
      id="wizard-stepper"
      title="WizardStepper"
      description="components/common/WizardStepper.jsx – current / done / upcoming steps; click a done step (tick) to go back. Upcoming steps are not clickable."
    >
      <DemoRow label="Interactive – click a done step, or Next" direction="column" align="flex-start">
        <WizardStepper steps={SETUP_STEPS} currentStep={current} onStepClick={setCurrent} />
        <Button size="sm" onClick={() => next && setCurrent(next.id)} isDisabled={!next}>
          Next
        </Button>
        <Text textStyle="caption">Current step: {current}</Text>
      </DemoRow>

      <DemoRow label="First step" direction="column" align="flex-start">
        <WizardStepper steps={SETUP_STEPS} currentStep="details" />
      </DemoRow>

      <DemoRow label="Last step, done steps not clickable (no onStepClick)" direction="column" align="flex-start">
        <WizardStepper steps={SETUP_STEPS} currentStep="review" />
      </DemoRow>
    </DemoSection>
  );
};

export default WizardStepperDemo;
