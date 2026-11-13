import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import Button from "./Button";

// Shown when a table / list / panel has nothing to display. e.g.
// <EmptyState icon={FiFileText} title="No artifacts yet"
//   message="Start by running an approved action." />
// With an optional call-to-action button:
// <EmptyState icon={FiUpload} title="No evidence yet" message="Upload your first file."
//   actionLabel="Upload Evidence" onAction={openUpload} />
const EmptyState = ({ icon, title, message, actionLabel, onAction }) => (
  <Flex direction="column" align="center" justify="center" textAlign="center" py={10} px={6}>
    {icon && <Icon as={icon} boxSize="48px" color="text.muted" mb={4} aria-hidden="true" />}
    <Text fontSize="md" fontWeight="bold" color="text.primary">
      {title}
    </Text>
    {message && (
      <Text fontSize="sm" color="text.secondary" mt={1}>
        {message}
      </Text>
    )}
    {actionLabel && (
      <Button size="sm" mt={4} onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Flex>
);

export default EmptyState;
