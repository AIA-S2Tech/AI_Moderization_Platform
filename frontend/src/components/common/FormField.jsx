// Shared FormField (S2-05).
// Wraps any field with: label above, required marker, help text, inline error, and the
// disabled / read-only state. Built on Chakra's FormControl, so a Chakra input inside it
// automatically gets the label link (id), aria-describedby (help + error), aria-invalid,
// required, disabled and readOnly – no extra wiring needed.
// TextInput and Select use it when given a `label`; use it directly for any other field.
//
// Props:
//   label      : text above the field
//   helpText   : hint under the field
//   error      : error message – when set the field is shown as invalid
//   isRequired : shows the * marker and marks the field required
//   isDisabled : field can't be used (greyed)
//   isReadOnly : value shown but can't be changed (e.g. Project status "Draft")
//   id         : optional field id (one is generated otherwise)
//   children   : the field
//   ...rest    : props for the outer FormControl (mb, maxW, etc.)
//
// Example:
//   <FormField label="Reason for change" isRequired error={errors.reason}>
//     <Textarea value={reason} onChange={...} />
//   </FormField>

import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";

// Field box styles shared by TextInput and Select (same look as SearchInput / FilterSelect).
// Theme tokens only.
export const FIELD_STYLES = {
  bg: "bg.surface",
  color: "text.primary",
  borderColor: "border.default",
  borderRadius: "md",
  errorBorderColor: "status.danger.fg",
  _hover: { borderColor: "border.strong" },
  _focusVisible: { borderColor: "navy.500", boxShadow: "focus" },
  _invalid: { borderColor: "status.danger.fg", boxShadow: "none" },
  _disabled: { bg: "bg.subtle", color: "text.muted", opacity: 1, cursor: "not-allowed" },
  _readOnly: { bg: "bg.subtle", cursor: "default", _hover: { borderColor: "border.default" } },
};

const RequiredMarker = () => (
  <Text as="span" color="status.danger.fg" ml={1} aria-hidden="true">
    *
  </Text>
);

const FormField = ({
  label,
  helpText,
  error,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  id,
  children,
  ...rest
}) => (
  <FormControl
    id={id}
    isRequired={isRequired}
    isInvalid={Boolean(error)}
    isDisabled={isDisabled}
    isReadOnly={isReadOnly}
    {...rest}
  >
    {label && (
      <FormLabel
        fontSize="sm"
        fontWeight="semibold"
        color="text.primary"
        mb={1}
        requiredIndicator={<RequiredMarker />}
        _disabled={{ opacity: 1, color: "text.muted" }}
      >
        {label}
      </FormLabel>
    )}
    {children}
    {helpText && (
      <FormHelperText textStyle="caption" mt={1}>
        {helpText}
      </FormHelperText>
    )}
    <FormErrorMessage fontSize="xs" color="status.danger.fg" mt={1} gap={1} alignItems="flex-start">
      <Icon as={FiAlertCircle} boxSize="14px" mt="1px" flexShrink={0} aria-hidden="true" />
      {error}
    </FormErrorMessage>
  </FormControl>
);

export default FormField;
