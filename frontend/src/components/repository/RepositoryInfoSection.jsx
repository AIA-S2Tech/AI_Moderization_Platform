import React from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import FlowStepper from "../common/FlowStepper";
import InfoListCard from "../common/InfoListCard";
import { REPOSITORY_INFO } from "../../config/repositoryInfo";

// Shared bottom section of the Repositories hub: Recommended Use and Flow,
// Key Principles (numbered) and Benefits (ticks) – side by side from 992px,
// one under the other below that. All text comes from config/repositoryInfo.js.
// e.g. <RepositoryInfoSection />
const RepositoryInfoSection = () => {
  const { flow, principles, benefits } = REPOSITORY_INFO;

  return (
    <Grid
      as="section"
      aria-label="Repository information"
      templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr)" }}
      gap={{ base: 6, lg: 8 }}
    >
      <Box>
        <Text as="h3" fontSize="xl" fontWeight="bold" color="text.primary" mb={4}>
          {flow.title}
        </Text>
        <FlowStepper variant="solid" steps={flow.steps} />
      </Box>

      <InfoListCard title={principles.title} listStyle="numbered" items={principles.items} />
      <InfoListCard title={benefits.title} listStyle="ticks" items={benefits.items} />
    </Grid>
  );
};

export default RepositoryInfoSection;
