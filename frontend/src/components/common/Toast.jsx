import React, { useMemo } from "react";
import { CloseButton, Flex, Text, useToast } from "@chakra-ui/react";

// Colours + symbol per toast type. Theme tokens only.
const TYPES = {
  success: { bg: "status.success.bg", accent: "status.success.fg", symbol: "✓" },
  error: { bg: "status.danger.bg", accent: "status.danger.fg", symbol: "!" },
  info: { bg: "status.info.bg", accent: "status.info.fg", symbol: "i" },
};

const ToastBox = ({ type, message, onClose }) => {
  const t = TYPES[type];

  return (
    <Flex
      role="status"
      align="center"
      gap={3}
      w={{ base: "calc(100vw - 32px)", sm: "380px" }}
      px={4}
      py={3}
      bg={t.bg}
      border="1px solid"
      borderColor={t.accent}
      borderRadius="lg"
      boxShadow="dropdown"
    >
      <Flex
        align="center"
        justify="center"
        boxSize="24px"
        borderRadius="full"
        bg={t.accent}
        color="text.inverse"
        fontSize="sm"
        fontWeight="bold"
        flexShrink={0}
        aria-hidden="true"
      >
        {t.symbol}
      </Flex>
      <Text flex="1" fontSize="sm" color="text.primary">
        {message}
      </Text>
      <CloseButton size="sm" color="text.muted" aria-label="Dismiss" onClick={onClose} />
    </Flex>
  );
};

// Top-right toasts that auto-dismiss and stack. e.g.
// const toast = useAppToast();
// toast.success("Evidence uploaded successfully");
// toast.error("Upload failed – file larger than 50 MB");
// toast.info("Action started – artifact will appear shortly");
export const useAppToast = () => {
  const toast = useToast();

  return useMemo(() => {
    const show = (type) => (message) =>
      toast({
        position: "top-right",
        duration: 4000,
        render: ({ onClose }) => <ToastBox type={type} message={message} onClose={onClose} />,
      });

    return { success: show("success"), error: show("error"), info: show("info") };
  }, [toast]);
};

export default useAppToast;
