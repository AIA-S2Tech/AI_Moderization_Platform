import React from "react";
import { Stack } from "@chakra-ui/react";
import RepositoryPanel from "../../components/repository/RepositoryPanel";
import InfoListCard from "../../components/common/InfoListCard";
import { REPOSITORY_KEYS, getRepositoryConfig } from "../../config/repositories";

// Evidence Repository page (/repositories/evidence). Config only – the panel,
// columns, tabs, filters and info text all come from config/repositories.js.
const EvidenceRepositoryPage = () => {
  const { title, tone, info } = getRepositoryConfig(REPOSITORY_KEYS.EVIDENCE);

  return (
    <Stack spacing={6}>
      <RepositoryPanel repository={REPOSITORY_KEYS.EVIDENCE} />
      <InfoListCard number={info.number} title={title} tone={tone} listStyle="bullets" items={info.items} />
    </Stack>
  );
};

export default EvidenceRepositoryPage;
