// Shared Select (S2-05).
// A dropdown with the standard label / required / help / error / disabled / read-only
// handling from FormField, a placeholder, and optional search.
//
//   isSearchable = false (default) – native <select>: best for short lists, works with
//                  the phone's own picker.
//   isSearchable = true            – type to filter the list (e.g. Project lead). Follows the
//                  ARIA combobox pattern: ↑/↓ move, Enter picks, Esc closes.
//   isReadOnly                     – shows the chosen label as a read-only field (a native
//                  <select> can't be read-only).
//
// Props:
//   label, helpText, error, isRequired, isDisabled, isReadOnly, id – see FormField
//   options       : [{ value, label }] or plain strings
//   value         : selected value ("" = nothing selected)
//   onChange      : (value) => void – gets the value, not the event
//   placeholder   : shown when nothing is selected, e.g. "Select authorized project lead"
//   isSearchable  : see above
//   noOptionsText : shown when the search matches nothing (default "No matches")
//   size          : "sm" | "md" (default "md")
//   fieldProps    : props for the outer FormField (mb, maxW, etc.)
//   ...rest       : passed to the <select> / search input
//
// Example:
//   <Select label="Project lead" isRequired isSearchable
//           placeholder="Select authorized project lead"
//           options={leads.map((l) => ({ value: l.id, label: l.name }))}
//           value={leadId} onChange={setLeadId} error={errors.leadId} />

import React, { useEffect, useId, useRef, useState } from "react";
import {
  Box,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select as ChakraSelect,
  Text,
  useFormControlContext,
} from "@chakra-ui/react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import FormField, { FIELD_STYLES } from "./FormField";

// Accept plain strings or { value, label } objects.
const normalise = (option) =>
  typeof option === "object" ? option : { value: option, label: String(option) };

// ── Searchable (combobox) ──────────────────────────────────────────────

const SearchableSelect = ({
  id,
  options,
  value,
  onChange,
  placeholder,
  noOptionsText,
  size,
  isDisabled,
  isRequired,
  isInvalid,
  ...rest
}) => {
  const field = useFormControlContext();
  const generatedId = useId();
  const inputId = id || field?.id || `select-${generatedId}`;
  const listboxId = `${inputId}-listbox`;
  const optionId = (index) => `${inputId}-option-${index}`;
  const disabled = isDisabled ?? field?.isDisabled;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const selected = options.find((o) => o.value === value) || null;
  const q = query.trim().toLowerCase();
  const filtered = q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  const activeOption = isOpen ? filtered[activeIndex] : undefined;

  const open = () => {
    if (disabled || isOpen) return;
    setQuery("");
    setActiveIndex(Math.max(0, options.indexOf(selected)));
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setQuery("");
  };

  const pick = (option) => {
    onChange?.(option.value);
    close();
  };

  // Keep the highlighted option visible while moving with the arrow keys.
  useEffect(() => {
    if (!isOpen) return;
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView?.({ block: "nearest" });
  }, [isOpen, activeIndex]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) open();
        else setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) open();
        else setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (isOpen) {
          e.preventDefault(); // don't submit the form
          if (activeOption) pick(activeOption);
        }
        break;
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          e.stopPropagation(); // close the list, not a surrounding modal
          close();
        }
        break;
      case "Tab":
        close();
        break;
      default:
    }
  };

  return (
    <Box position="relative">
      <InputGroup size={size}>
        <Input
          ref={inputRef}
          id={inputId}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeOption ? optionId(activeIndex) : undefined}
          autoComplete="off"
          isDisabled={isDisabled}
          isRequired={isRequired}
          isInvalid={isInvalid}
          value={isOpen ? query : selected?.label || ""}
          placeholder={isOpen ? selected?.label || "Type to search…" : placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            setIsOpen(true);
          }}
          onClick={open}
          onKeyDown={handleKeyDown}
          onBlur={close}
          pr={9}
          {...FIELD_STYLES}
          {...rest}
        />
        <InputRightElement>
          <IconButton
            aria-label={isOpen ? "Hide options" : "Show options"}
            tabIndex={-1}
            icon={<FiChevronDown />}
            size="xs"
            variant="ghost"
            color="text.muted"
            isDisabled={disabled}
            transform={isOpen ? "rotate(180deg)" : undefined}
            onMouseDown={(e) => e.preventDefault()} // keep focus in the input
            onClick={() => {
              inputRef.current?.focus();
              if (isOpen) close();
              else open();
            }}
          />
        </InputRightElement>
      </InputGroup>

      <Box
        ref={listRef}
        as="ul"
        id={listboxId}
        role="listbox"
        aria-labelledby={field?.labelId}
        hidden={!isOpen}
        position="absolute"
        top="100%"
        left={0}
        right={0}
        mt={1}
        zIndex="dropdown"
        maxH="240px"
        overflowY="auto"
        listStyleType="none"
        py={1}
        bg="bg.surface"
        border="1px solid"
        borderColor="border.default"
        borderRadius="md"
        boxShadow="dropdown"
      >
        {filtered.map((option, index) => {
          const isSelected = option.value === value;
          const isActive = index === activeIndex;
          return (
            <Box
              as="li"
              key={option.value}
              id={optionId(index)}
              data-index={index}
              role="option"
              aria-selected={isSelected}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              px={3}
              py={2}
              fontSize="sm"
              cursor="pointer"
              color="text.primary"
              fontWeight={isSelected ? "semibold" : "normal"}
              bg={isActive ? "bg.navTint" : undefined}
              onMouseDown={(e) => e.preventDefault()} // keep focus in the input
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => pick(option)}
            >
              {option.label}
              {isSelected && <Icon as={FiCheck} color="navy.800" aria-hidden="true" />}
            </Box>
          );
        })}
        {filtered.length === 0 && (
          <Text as="li" px={3} py={2} textStyle="caption" role="option" aria-disabled="true" aria-selected={false}>
            {noOptionsText}
          </Text>
        )}
      </Box>
    </Box>
  );
};

// ── Select ─────────────────────────────────────────────────────────────

const Select = ({
  label,
  helpText,
  error,
  isRequired,
  isDisabled,
  isReadOnly,
  id,
  options = [],
  value = "",
  onChange,
  placeholder,
  isSearchable = false,
  noOptionsText = "No matches",
  size = "md",
  fieldProps,
  ...rest
}) => {
  const items = options.map(normalise);
  const field = useFormControlContext();
  const readOnly = isReadOnly ?? field?.isReadOnly;

  // Without a label there is no FormField of our own, so the states go on the control
  // (an outer FormField still applies).
  const own = label
    ? {}
    : { id, isRequired, isInvalid: error ? true : undefined, isDisabled, isReadOnly };

  let control;
  if (readOnly) {
    control = (
      <Input
        size={size}
        isReadOnly
        value={items.find((o) => o.value === value)?.label || ""}
        placeholder={placeholder}
        {...FIELD_STYLES}
        {...own}
        {...rest}
      />
    );
  } else if (isSearchable) {
    control = (
      <SearchableSelect
        options={items}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        noOptionsText={noOptionsText}
        size={size}
        {...own}
        {...rest}
      />
    );
  } else {
    control = (
      <ChakraSelect
        size={size}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        {...FIELD_STYLES}
        // Placeholder look while nothing is selected; the options themselves stay dark.
        color={value ? "text.primary" : "text.muted"}
        sx={{ "& > option": { color: "text.primary" } }}
        {...own}
        {...rest}
      >
        {items.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </ChakraSelect>
    );
  }

  if (!label) return control;

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
      {control}
    </FormField>
  );
};

export default Select;
