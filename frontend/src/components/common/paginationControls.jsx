import { useState, useEffect } from "react";
import { Flex, Button, Input, Text } from "@chakra-ui/react";

// Shared pagination UI (First / Previous / page-jump input / Next / Last)
const PaginationControls = ({ currentPage, totalPages, onPageChange, isDisabled = false }) => {
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  if (!totalPages || totalPages <= 1) return null;

  const commitPageInput = () => {
    const parsed = parseInt(pageInput, 10);
    if (isNaN(parsed)) {
      setPageInput(String(currentPage));
      return;
    }
    const clamped = Math.min(Math.max(parsed, 1), totalPages);
    if (clamped !== currentPage) {
      onPageChange(clamped);
    } else {
      setPageInput(String(clamped));
    }
  };

  return (
    <Flex justify="center" align="center" mt={4} mb={4} gap={4}>
      <Button size="sm" onClick={() => onPageChange(1)} isDisabled={isDisabled || currentPage === 1}>
        First
      </Button>

      <Button
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        isDisabled={isDisabled || currentPage === 1}
      >
        Previous
      </Button>

      <Flex align="center" justify="center" gap={1} fontSize="sm" color="gray.600">
        <Text whiteSpace="nowrap">Page</Text>

        <Input
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ""))}
          onBlur={commitPageInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
          isDisabled={isDisabled}
          w="32px"
          h="22px"
          minW="unset"
          px={1}
          textAlign="center"
          borderColor="gray.300"
          bg="white"
          color="gray.700"
          fontSize="sm"
          borderRadius="md"
          _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)" }}
        />

        <Text whiteSpace="nowrap">of {totalPages}</Text>
      </Flex>

      <Button
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        isDisabled={isDisabled || currentPage === totalPages}
      >
        Next
      </Button>

      <Button
        size="sm"
        onClick={() => onPageChange(totalPages)}
        isDisabled={isDisabled || currentPage === totalPages}
      >
        Last
      </Button>
    </Flex>
  );
};

export default PaginationControls;
