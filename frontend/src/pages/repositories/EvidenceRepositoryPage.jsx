import React, { useState } from "react";
import { Stack, useDisclosure } from "@chakra-ui/react";
import RepositoryPanel from "../../components/repository/RepositoryPanel";
import UploadEvidenceModal from "../../components/repository/UploadEvidenceModal";
import InfoListCard from "../../components/common/InfoListCard";
import { REPOSITORY_KEYS, getRepositoryConfig } from "../../config/repositories";

// Evidence Repository page (/repositories/evidence). Config only – the panel,
// columns, tabs, filters and info text all come from config/repositories.js.
const EvidenceRepositoryPage = () => {
  const { title, tone, info } = getRepositoryConfig(REPOSITORY_KEYS.EVIDENCE);
  const upload = useDisclosure();
  // Changing it makes the panel load the list again (after an upload).
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Stack spacing={6}>
      <RepositoryPanel
        repository={REPOSITORY_KEYS.EVIDENCE}
        onAction={(actionId) => actionId === "upload" && upload.onOpen()}
        refreshKey={refreshKey}
      />
      <InfoListCard number={info.number} title={title} tone={tone} listStyle="bullets" items={info.items} />
      <UploadEvidenceModal
        isOpen={upload.isOpen}
        onClose={upload.onClose}
        onUploaded={() => setRefreshKey((n) => n + 1)}
      />
    </Stack>
  );
};

export default EvidenceRepositoryPage;
