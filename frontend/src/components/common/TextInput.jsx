// Shared TextInput (S2-05).
// A text field with the standard label / required / help / error / disabled / read-only
// handling from FormField. Without a `label` it renders just the input (for use inside
// your own FormField).
//
// Props:
//   label, helpText, error, isRequired, isDisabled, isReadOnly, id – see FormField
//   value, onChange : controlled value; onChange gets the change event (like a normal input)
//   placeholder, type, name, size ("sm" | "md", default "md"), maxLength …
//   fieldProps      : props for the outer FormField (mb, maxW, etc.)
//   ...rest         : passed to the input
//
// Example:
//   <TextInput label="Project name" isRequired value={name}
//              onChange={(e) => setName(e.target.value)} error={errors.name} />
//   <TextInput label="Project status" value="Draft" isReadOnly />

import React from "react";
import { Input } from "@chakra-ui/react";
import FormField, { FIELD_STYLES } from "./FormField";

const TextInput = ({
  label,
  helpText,
  error,
  isRequired,
  isDisabled,
  isReadOnly,
  id,
  size = "md",
  fieldProps,
  ...rest
}) => {
  if (!label) {
    // No FormField of our own – put the states on the input (an outer FormField still applies).
    return (
      <Input
        id={id}
        size={size}
        isRequired={isRequired}
        isInvalid={error ? true : undefined}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        {...FIELD_STYLES}
        {...rest}
      />
    );
  }

  const input = <Input size={size} {...FIELD_STYLES} {...rest} />;

  return (
    <FormField
      id={id}
      label={label}
      helpText={helpText}
      error={error}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      {...fieldProps}
    >
      {input}
    </FormField>
  );
};

export default TextInput;
