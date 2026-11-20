import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import SectionCard from "../common/SectionCard";
import RepositorySummaryCard from "./RepositorySummaryCard";
import { REPOSITORY_SUMMARY_CARDS } from "../../config/repositorySummaryCards";

// "PROJECT REPOSITORIES" section of the dashboard: the 3 cards from
// config/repositorySummaryCards.js. The page passes the live numbers, e.g.
// <RepositorySummaryPanel summaries={{
//   evidence: { count: 324, lastUpdated: "2026-05-21" },
//   artifacts: { count: 128, lastUpdated: "2026-05-21" },
//   certified: { count: 54, lastUpdated: "2026-05-21" },
// }} />
const RepositorySummaryPanel = ({ summaries = {}, ...rest }) => (
  <SectionCard title="Project Repositories" showDivider={false} {...rest}>
    <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
      {REPOSITORY_SUMMARY_CARDS.map((card) => {
        const summary = summaries[card.key] || {};
        return (
          <RepositorySummaryCard
            key={card.key}
            icon={card.icon}
            tone={card.tone}
            title={card.title}
            description={card.description}
            path={card.path}
            count={summary.count}
            lastUpdated={summary.lastUpdated}
          />
        );
      })}
    </SimpleGrid>
  </SectionCard>
);

export default RepositorySummaryPanel;
