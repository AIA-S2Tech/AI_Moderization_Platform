import React, { useEffect, useState } from "react";
import { Flex, HStack, Input, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "./Button";
import { getRange, getTotalPages } from "../../utils/pagination";

const Pagination = ({
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  itemLabel = "items",
  isDisabled = false,
  ...rest
}) => {
  const totalPages = getTotalPages(total, pageSize);
  const current = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const { from, to } = getRange(current, pageSize, total);
  const [pageInput, setPageInput] = useState(String(current));

  useEffect(() => {
    setPageInput(String(current));
  }, [current]);

  const goTo = (p) => {
    if (p !== current && p >= 1 && p <= totalPages) onPageChange?.(p);
  };

  // Jump to the typed page on Enter / blur; out-of-range values are clamped.
  const commitPageInput = () => {
    const parsed = parseInt(pageInput, 10);
    if (Number.isNaN(parsed)) {
      setPageInput(String(current));
      return;
    }
    const clamped = Math.min(Math.max(parsed, 1), totalPages);
    setPageInput(String(clamped));
    goTo(clamped);
  };

  const isFirst = current === 1;
  const isLast = current === totalPages;

  return (
    <Flex
      as="nav"
      aria-label="Pagination"
      align="center"
      justify="space-between"
      wrap="wrap"
      gap={3}
      {...rest}
    >
      <Text fontSize="sm" color="text.secondary" aria-live="polite">
        {total > 0
          ? `Showing ${from} - ${to} of ${total} ${itemLabel}`
          : `No ${itemLabel}`}
      </Text>

      {totalPages > 1 && (
        <HStack spacing={2}>
          <Button
            variant="outline"
            size="sm"
            isDisabled={isDisabled || isFirst}
            onClick={() => goTo(1)}
          >
            First
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<FiChevronLeft />}
            aria-label="Previous page"
            isDisabled={isDisabled || isFirst}
            onClick={() => goTo(current - 1)}
          />

          <HStack spacing={1} fontSize="sm" color="text.secondary">
            <Text whiteSpace="nowrap">Page</Text>
            <Input
              aria-label="Current page"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ""))}
              onBlur={commitPageInput}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
              isDisabled={isDisabled}
              size="sm"
              w="44px"
              px={1}
              textAlign="center"
              bg="bg.surface"
              color="text.primary"
              borderColor="border.default"
              borderRadius="md"
              _hover={{ borderColor: "border.strong" }}
              _focusVisible={{ borderColor: "navy.500", boxShadow: "focus" }}
            />
            <Text whiteSpace="nowrap">of {totalPages}</Text>
          </HStack>

          <Button
            variant="outline"
            size="sm"
            icon={<FiChevronRight />}
            aria-label="Next page"
            isDisabled={isDisabled || isLast}
            onClick={() => goTo(current + 1)}
          />

          <Button
            variant="outline"
            size="sm"
            isDisabled={isDisabled || isLast}
            onClick={() => goTo(totalPages)}
          >
            Last
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default Pagination;
