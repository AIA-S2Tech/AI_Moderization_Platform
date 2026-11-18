import React, { useState } from "react";
import { Stack, useDisclosure } from "@chakra-ui/react";
import RepositoryPanel from "../../components/repository/RepositoryPanel";
import NewFolderModal from "../../components/repository/NewFolderModal";
import InfoListCard from "../../components/common/InfoListCard";
import { REPOSITORY_KEYS, getRepositoryConfig } from "../../config/repositories";

// Working/Generated Artifact Repository page (/repositories/artifacts). Config only –
// the panel, columns, tabs, filters and info text all come from config/repositories.js.
const ArtifactRepositoryPage = () => {
  const { title, tone, info } = getRepositoryConfig(REPOSITORY_KEYS.ARTIFACTS);
  const newFolder = useDisclosure();
  // Changing it makes the panel load the list again (after a folder is created).
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Stack spacing={6}>
      <RepositoryPanel
        repository={REPOSITORY_KEYS.ARTIFACTS}
        onAction={(actionId) => actionId === "new-folder" && newFolder.onOpen()}
        refreshKey={refreshKey}
      />
      <InfoListCard number={info.number} title={title} tone={tone} listStyle="bullets" items={info.items} />
      <NewFolderModal
        isOpen={newFolder.isOpen}
        onClose={newFolder.onClose}
        onCreated={() => setRefreshKey((n) => n + 1)}
      />
    </Stack>
  );
};

export default ArtifactRepositoryPage;
