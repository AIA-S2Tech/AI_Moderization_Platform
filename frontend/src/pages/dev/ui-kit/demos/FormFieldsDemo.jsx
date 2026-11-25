// UI Kit demo – Form fields: TextInput, Select & FormField (S2-05).

import React, { useState } from "react";
import { SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import TextInput from "../../../../components/common/TextInput";
import Select from "../../../../components/common/Select";
import FormField from "../../../../components/common/FormField";
import Button from "../../../../components/common/Button";
import { DemoSection, DemoRow } from "../DemoSection";

const LEADS = [
  { value: "u-lead-1", label: "Linda Park" },
  { value: "u-lead-2", label: "Raj Mehta" },
  { value: "u-lead-3", label: "Priya Nair" },
  { value: "u-lead-4", label: "Daniel Okafor" },
  { value: "u-lead-5", label: "Sofia Alvarez" },
  { value: "u-lead-6", label: "Chen Wei" },
  { value: "u-lead-7", label: "Amara Singh" },
];

const METHODOLOGY = [{ value: "v1.0", label: "v1.0 (published)" }];

const FormFieldsDemo = () => {
  const [name, setName] = useState("");
  const [leadId, setLeadId] = useState("");
  const [version, setVersion] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () =>
    setErrors({
      name: name.trim() ? undefined : "Enter a project name",
      leadId: leadId ? undefined : "Select a project lead",
      version: version ? undefined : "Select a methodology version",
    });

  return (
    <DemoSection
      id="form-fields"
      title="Form fields – TextInput, Select & FormField"
      description="components/common/TextInput.jsx, Select.jsx, FormField.jsx – label above, required *, help text, inline error, disabled / read-only. Select: placeholder, optional search (isSearchable)."
    >
      <DemoRow label="Try it – click Validate with empty fields" direction="column" align="stretch">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="100%">
          <TextInput
            label="Project name"
            isRequired
            placeholder="e.g. Eligibility Modernization"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <Select
            label="Project lead"
            isRequired
            isSearchable
            placeholder="Select authorized project lead"
            helpText="Members with the LEAD role. Type to search."
            options={LEADS}
            value={leadId}
            onChange={setLeadId}
            error={errors.leadId}
          />
          <Select
            label="Methodology version"
            isRequired
            placeholder="Select version"
            options={METHODOLOGY}
            value={version}
            onChange={setVersion}
            error={errors.version}
          />
        </SimpleGrid>
        <Button size="sm" alignSelf="flex-start" onClick={validate}>
          Validate
        </Button>
        <Text textStyle="caption">
          Values: name “{name}”, lead “{leadId}”, version “{version}”
        </Text>
      </DemoRow>

      <DemoRow label="States" direction="column" align="stretch">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="100%">
          <TextInput label="Client" helpText="Help text under the field." placeholder="Client name" />
          <TextInput label="System / application" error="Error message shows here" defaultValue="ELIG" />
          <TextInput label="Disabled" isDisabled defaultValue="Can't be edited" />
          <TextInput label="Project status (read-only)" isReadOnly value="Draft" />
          <Select label="Project lead (read-only)" isReadOnly options={LEADS} value="u-lead-1" />
          <Select label="Disabled select" isDisabled placeholder="Select…" options={LEADS} />
        </SimpleGrid>
      </DemoRow>

      <DemoRow label="FormField around any field, size sm" direction="column" align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="100%">
          <FormField label="Reason for change" isRequired helpText="Shown in the scope history.">
            <Textarea
              bg="bg.surface"
              borderColor="border.default"
              _hover={{ borderColor: "border.strong" }}
              _focusVisible={{ borderColor: "navy.500", boxShadow: "focus" }}
              placeholder="Client requests roadmap planning"
            />
          </FormField>
          <TextInput label="Small input" size="sm" placeholder="size='sm'" />
        </SimpleGrid>
      </DemoRow>
    </DemoSection>
  );
};

export default FormFieldsDemo;
