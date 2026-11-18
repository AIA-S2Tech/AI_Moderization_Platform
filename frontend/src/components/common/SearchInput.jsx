import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchInput = ({
  onSearch,
  value = "",
  placeholder = "Search…",
  debounceMs = 300,
  size = "sm",
  "aria-label": ariaLabel,
  ...rest
}) => {
  const [text, setText] = useState(value);
  const lastSent = useRef(value);

  // Keep in sync when the parent changes 'value' (e.g. a "reset filters" action).
  useEffect(() => {
    setText(value);
    lastSent.current = value;
  }, [value]);

  // Debounce: send the text once typing pauses.
  useEffect(() => {
    if (text === lastSent.current) return undefined;
    const timer = setTimeout(() => {
      lastSent.current = text;
      onSearch?.(text);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [text, debounceMs, onSearch]);

  const handleClear = () => {
    setText("");
    lastSent.current = "";
    onSearch?.("");
  };

  return (
    <InputGroup size={size} {...rest}>
      <InputLeftElement pointerEvents="none" color="text.muted">
        <FiSearch />
      </InputLeftElement>
      <Input
        type="text"
        role="searchbox"
        aria-label={ariaLabel || placeholder}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && text && handleClear()}
        bg="bg.surface"
        color="text.primary"
        borderColor="border.default"
        borderRadius="md"
        _hover={{ borderColor: "border.strong" }}
        _focusVisible={{ borderColor: "navy.500", boxShadow: "focus" }}
      />
      {text && (
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<FiX />}
            size="xs"
            variant="ghost"
            color="text.muted"
            borderRadius="full"
            _hover={{ bg: "bg.subtle", color: "text.primary" }}
            onClick={handleClear}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchInput;
