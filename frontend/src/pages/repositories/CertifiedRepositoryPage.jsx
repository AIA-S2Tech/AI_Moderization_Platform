import React, { useState } from "react";
import { Stack, useDisclosure } from "@chakra-ui/react";
import RepositoryPanel from "../../components/repository/RepositoryPanel";
import AddCertifiedItemModal from "../../components/repository/AddCertifiedItemModal";
import InfoListCard from "../../components/common/InfoListCard";
import { REPOSITORY_KEYS, getRepositoryConfig } from "../../config/repositories";

// Certified Knowledge Repository page (/repositories/certified). Config only –
// the panel, columns, tabs, filters and info text all come from config/repositories.js.
const CertifiedRepositoryPage = () => {
  const { title, tone, info } = getRepositoryConfig(REPOSITORY_KEYS.CERTIFIED);
  const addCertified = useDisclosure();
  // Changing it makes the panel load the list again (after an item is certified).
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Stack spacing={6}>
      <RepositoryPanel
        repository={REPOSITORY_KEYS.CERTIFIED}
        onAction={(actionId) => actionId === "add-certified" && addCertified.onOpen()}
        refreshKey={refreshKey}
      />
      <InfoListCard number={info.number} title={title} tone={tone} listStyle="bullets" items={info.items} />
      <AddCertifiedItemModal
        isOpen={addCertified.isOpen}
        onClose={addCertified.onClose}
        onCreated={() => setRefreshKey((n) => n + 1)}
      />
    </Stack>
  );
};

export default CertifiedRepositoryPage;
