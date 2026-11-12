import React from "react";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "./Button";
import { getPageItems, getRange, getTotalPages } from "../../utils/pagination";

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

  const goTo = (p) => {
    if (p !== current && p >= 1 && p <= totalPages) onPageChange?.(p);
  };

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
        <HStack as="ul" listStyleType="none" spacing={1}>
          <li>
            <Button
              variant="outline"
              size="sm"
              icon={<FiChevronLeft />}
              aria-label="Previous page"
              isDisabled={isDisabled || current === 1}
              onClick={() => goTo(current - 1)}
            />
          </li>

          {getPageItems(current, totalPages).map((item, index) =>
            item === "…" ? (
              <Text as="li" key={`gap-${index}`} px={1} fontSize="sm" color="text.muted" aria-hidden="true">
                …
              </Text>
            ) : (
              <li key={item}>
                <Button
                  variant={item === current ? "primary" : "outline"}
                  size="sm"
                  aria-label={`Page ${item}`}
                  aria-current={item === current ? "page" : undefined}
                  isDisabled={isDisabled}
                  onClick={() => goTo(item)}
                >
                  {item}
                </Button>
              </li>
            )
          )}

          <li>
            <Button
              variant="outline"
              size="sm"
              icon={<FiChevronRight />}
              aria-label="Next page"
              isDisabled={isDisabled || current === totalPages}
              onClick={() => goTo(current + 1)}
            />
          </li>
        </HStack>
      )}
    </Flex>
  );
};

export default Pagination;
