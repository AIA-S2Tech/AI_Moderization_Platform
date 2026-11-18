import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import Card from "../common/Card";
import FlowStepper from "../common/FlowStepper";
import InfoListCard from "../common/InfoListCard";
import { REPOSITORY_INFO } from "../../config/repositoryInfo";

// Shared bottom section of the 3 repository pages and the hub:
// Recommended Use and Flow, Key Principles (numbered) and Benefits (ticks).
// All text comes from config/repositoryInfo.js. e.g. <RepositoryInfoSection />
const RepositoryInfoSection = () => {
  const { flow, principles, benefits } = REPOSITORY_INFO;

  return (
    <Card as="section" aria-label="Repository information">
      <Stack spacing={6}>
        <Box>
          <Text as="h3" fontSize="xl" fontWeight="bold" color="text.primary" mb={4}>
            {flow.title}
          </Text>
          <FlowStepper variant="solid" steps={flow.steps} />
        </Box>

        <InfoListCard title={principles.title} listStyle="numbered" items={principles.items} />
        <InfoListCard title={benefits.title} listStyle="ticks" items={benefits.items} />
      </Stack>
    </Card>
  );
};

export default RepositoryInfoSection;
