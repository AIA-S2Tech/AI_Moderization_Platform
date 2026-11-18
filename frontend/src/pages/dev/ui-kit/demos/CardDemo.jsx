// UI Kit demo – Card, SectionCard & PageHeader (T-05).

import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { FiPlus, FiUpload } from "react-icons/fi";
import Card from "../../../../components/common/Card";
import SectionCard from "../../../../components/common/SectionCard";
import PageHeader from "../../../../components/common/PageHeader";
import Button from "../../../../components/common/Button";
import { DemoSection, DemoRow } from "../DemoSection";

const SampleBody = () => (
  <Text textStyle="body" color="text.secondary">
    Body content goes here – a table, a list or stat tiles.
  </Text>
);

const pageHeaders = [
  { number: 0, tone: "navy", title: "Project Workspace", titleSuffix: "(Home)", subtitle: "High-level view of project status across the methodology" },
  { number: 1, tone: "navy", title: "Legacy Discovery Workspace", subtitle: "Understand what exists today, how it works, and what evidence supports it." },
  { number: 2, tone: "red", title: "Business Rule Intelligence Workspace", subtitle: "Extract, validate and organize business rules and business intent." },
  { number: 3, tone: "navy", title: "Modernization Assessment Workspace", subtitle: "Assess what should change and the impact of options." },
  { number: 4, tone: "red", title: "Targeted Modernization Workspace", subtitle: "Define the right modernization path and sequence." },
  { number: 5, tone: "navy", title: "AI-Assisted Code Transformation Workspace", subtitle: "Accelerate code transformation with AI under human control." },
];

const CardDemo = () => (
  <DemoSection
    id="card"
    title="Card, SectionCard & PageHeader"
    description="components/common/Card.jsx, SectionCard.jsx, PageHeader.jsx"
  >
    <DemoRow label="Card – default / hoverable / no padding" align="stretch">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} w="100%">
        <Card>
          <Text textStyle="cardTitle">Default card</Text>
          <Text textStyle="caption">White, border, shadow, 20px padding</Text>
        </Card>
        <Card isHoverable>
          <Text textStyle="cardTitle">Hoverable card</Text>
          <Text textStyle="caption">Shadow lifts on hover</Text>
        </Card>
        <Card padding={0}>
          <Box bg="bg.subtle" p={3} borderTopRadius="xl">
            <Text textStyle="tableHeader">padding=0</Text>
          </Box>
          <Box p={3}>
            <Text textStyle="caption">For full-width tables</Text>
          </Box>
        </Card>
      </SimpleGrid>
    </DemoRow>

    <DemoRow label="SectionCard – tone plain / navy / red" align="stretch">
      <Box w="100%" display="flex" flexDirection="column" gap={4}>
        <SectionCard title="Approved Actions">
          <SampleBody />
        </SectionCard>

        <SectionCard
          title="Project Dashboard"
          subtitle="Last Updated: May 21, 2026 9:30 AM"
          actions={<Button size="sm" variant="outline">View all</Button>}
        >
          <SampleBody />
        </SectionCard>

        <SectionCard
          tone="navy"
          title="Evidence Repository"
          subtitle="Source material and client-provided evidence"
          actions={<Button variant="outline" leftIcon={<FiUpload />}>Upload Evidence</Button>}
        >
          <SampleBody />
        </SectionCard>

        <SectionCard
          tone="red"
          title="Working / Generated Artifact Repository"
          subtitle="AI-generated and working artifacts awaiting validation"
          actions={<Button variant="outline" leftIcon={<FiPlus />}>New Folder</Button>}
        >
          <SampleBody />
        </SectionCard>

        <SectionCard title="Quick Access" showDivider={false}>
          <SampleBody />
        </SectionCard>
      </Box>
    </DemoRow>

    <DemoRow label="PageHeader – numbers 0–5, navy / red" align="stretch">
      <Box w="100%" display="flex" flexDirection="column" gap={6}>
        {pageHeaders.map((h) => (
          <PageHeader key={h.number} {...h} />
        ))}
        <PageHeader title="Repositories" subtitle="Without a number" />
        <PageHeader
          title="With actions"
          subtitle="Buttons on the right"
          actions={<Button leftIcon={<FiPlus />}>New Item</Button>}
        />
      </Box>
    </DemoRow>
  </DemoSection>
);

export default CardDemo;
