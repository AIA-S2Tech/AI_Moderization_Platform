// UI Kit demo – Button (T-03).

import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import {
  FiPlus,
  FiUpload,
  FiTrash2,
  FiFilter,
  FiMoreVertical,
  FiChevronRight,
} from "react-icons/fi";
import Button from "../../../../components/common/Button";
import { DemoSection, DemoRow } from "../DemoSection";

const ButtonDemo = () => {
  const [isSaving, setIsSaving] = useState(false);

  const fakeSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <DemoSection
      id="button"
      title="Button"
      description="components/common/Button.jsx – variants, sizes, icons, tone, disabled and loading states."
    >
      <DemoRow label="Variants (md)">
        <Button>Primary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </DemoRow>

      <DemoRow label="Size sm">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="danger">Danger</Button>
        <Button size="sm" variant="outline">Outline</Button>
        <Button size="sm" variant="ghost">Ghost</Button>
      </DemoRow>

      <DemoRow label="With icons">
        <Button leftIcon={<FiPlus />}>New Item</Button>
        <Button variant="danger" leftIcon={<FiTrash2 />}>Delete</Button>
        <Button variant="outline" rightIcon={<FiChevronRight />}>View all</Button>
      </DemoRow>

      <DemoRow label="Icon-only (filter, kebab)">
        <Button variant="outline" icon={<FiFilter />} aria-label="Filter" />
        <Button variant="ghost" icon={<FiMoreVertical />} aria-label="More actions" />
        <Button size="sm" variant="outline" icon={<FiFilter />} aria-label="Filter" />
        <Button size="sm" variant="ghost" icon={<FiMoreVertical />} aria-label="More actions" />
      </DemoRow>

      <DemoRow label="Tone red (outline / ghost)">
        <Button variant="outline" tone="red">Outline red</Button>
        <Button variant="ghost" tone="red">Ghost red</Button>
      </DemoRow>

      <DemoRow label="Outline on coloured headers">
        <Flex bg="navy.800" p={4} borderRadius="lg">
          <Button variant="outline" leftIcon={<FiUpload />}>Upload Evidence</Button>
        </Flex>
        <Flex bg="red.500" p={4} borderRadius="lg">
          <Button variant="outline" leftIcon={<FiPlus />}>New Folder</Button>
        </Flex>
      </DemoRow>

      <DemoRow label="Disabled">
        <Button isDisabled>Primary</Button>
        <Button variant="danger" isDisabled>Danger</Button>
        <Button variant="outline" isDisabled>Outline</Button>
        <Button variant="ghost" isDisabled>Ghost</Button>
        <Button variant="outline" icon={<FiFilter />} aria-label="Filter" isDisabled />
      </DemoRow>

      <DemoRow label="Loading (click Save)">
        <Button isLoading={isSaving} loadingText="Saving…" onClick={fakeSave}>
          Save
        </Button>
        <Button variant="outline" isLoading>Outline</Button>
      </DemoRow>

      <DemoRow label="Full width">
        <Button fullWidth>Full width</Button>
      </DemoRow>
    </DemoSection>
  );
};

export default ButtonDemo;
