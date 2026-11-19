import React, { Fragment, useState } from "react";
import { Box, Flex, Grid, GridItem, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import InfoListCard from "../../components/common/InfoListCard";
import RepositoryPanel from "../../components/repository/RepositoryPanel";
import RepositoryInfoSection from "../../components/repository/RepositoryInfoSection";
import UploadEvidenceModal from "../../components/repository/UploadEvidenceModal";
import NewFolderModal from "../../components/repository/NewFolderModal";
import AddCertifiedItemModal from "../../components/repository/AddCertifiedItemModal";
import { REPOSITORY_KEYS, getRepositoryConfig } from "../../config/repositories";
import { REPOSITORY_HUB } from "../../config/repositoryInfo";

// Left to right, as in the mockup: evidence → working artifacts → certified knowledge.
const HUB_ORDER = [REPOSITORY_KEYS.EVIDENCE, REPOSITORY_KEYS.ARTIFACTS, REPOSITORY_KEYS.CERTIFIED];

// Smaller text inside the 3 narrow panels (hub only – the full pages are unchanged),
// so more fits in a third of the screen. Theme sizes only; xs ≈ 12px.
const COMPACT_TEXT = {
  "& [role=tab]": { fontSize: "xs", px: 2 },
  "& input, & select": { fontSize: "xs" },
  "& table, & p": { fontSize: "xs" },
};

// Header button id (config/repositories.js) → the pop-up it opens.
const ACTION_TO_REPOSITORY = {
  upload: REPOSITORY_KEYS.EVIDENCE,
  "new-folder": REPOSITORY_KEYS.ARTIFACTS,
  "add-certified": REPOSITORY_KEYS.CERTIFIED,
};

// Repositories hub (/repositories): the 3 repositories side by side with arrows
// between them, each with its info panel, plus the shared info section. Each panel
// title links to its full page. Config only – content comes from config files.
const RepositoriesHubPage = () => {
  // Which pop-up is open (a repository key) or null.
  const modal = useDisclosure();
  const [openFor, setOpenFor] = useState(null);
  // One counter per repository, so only the changed list reloads.
  const [refreshKeys, setRefreshKeys] = useState({});

  const openModal = (actionId) => {
    const repositoryKey = ACTION_TO_REPOSITORY[actionId];
    if (!repositoryKey) return;
    setOpenFor(repositoryKey);
    modal.onOpen();
  };

  const refresh = (repositoryKey) =>
    setRefreshKeys((prev) => ({ ...prev, [repositoryKey]: (prev[repositoryKey] || 0) + 1 }));

  const modalProps = (repositoryKey) => ({
    isOpen: modal.isOpen && openFor === repositoryKey,
    onClose: modal.onClose,
  });

  return (
    <Stack spacing={6}>
      {/* Normal-case title as in the mockup (PageHeader always shows capitals) */}
      <Box>
        <Text as="h1" textStyle="pageTitle" textTransform="none" fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
          {REPOSITORY_HUB.title}
        </Text>
        <Text textStyle="pageSubtitle" fontSize={{ base: "sm", md: "md" }} mt={1}>
          {REPOSITORY_HUB.subtitle}
        </Text>
      </Box>

      {/* From 992px: a grid with the 3 panels in row 1 (same height) and the 3 info
          cards in row 2, so the info cards line up. Below 992px everything stacks. */}
      <Grid
        templateColumns={{
          base: "minmax(0, 1fr)",
          lg: "minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr)",
        }}
        columnGap={3}
        rowGap={4}
      >
        {HUB_ORDER.map((key, index) => {
          const { title, tone, info } = getRepositoryConfig(key);
          const column = index * 2 + 1;
          return (
            <Fragment key={key}>
              <GridItem minW={0} gridRow={{ lg: 1 }} gridColumn={{ lg: column }} sx={COMPACT_TEXT}>
                <RepositoryPanel
                  repository={key}
                  compact
                  linkTitle
                  onAction={openModal}
                  refreshKey={refreshKeys[key]}
                  h="100%"
                />
              </GridItem>
              <GridItem minW={0} gridRow={{ lg: 2 }} gridColumn={{ lg: column }}>
                <InfoListCard number={info.number} title={title} tone={tone} listStyle="bullets" items={info.items} />
              </GridItem>
              {index < HUB_ORDER.length - 1 && (
                <Flex
                  gridRow={{ lg: 1 }}
                  gridColumn={{ lg: column + 1 }}
                  align="center"
                  justify="center"
                  color="navy.800"
                  aria-hidden="true"
                >
                  <Icon as={FaArrowDown} boxSize="28px" display={{ base: "block", lg: "none" }} />
                  <Icon as={FaArrowRight} boxSize="28px" display={{ base: "none", lg: "block" }} />
                </Flex>
              )}
            </Fragment>
          );
        })}
      </Grid>

      <RepositoryInfoSection />

      <UploadEvidenceModal
        {...modalProps(REPOSITORY_KEYS.EVIDENCE)}
        onUploaded={() => refresh(REPOSITORY_KEYS.EVIDENCE)}
      />
      <NewFolderModal
        {...modalProps(REPOSITORY_KEYS.ARTIFACTS)}
        onCreated={() => refresh(REPOSITORY_KEYS.ARTIFACTS)}
      />
      <AddCertifiedItemModal
        {...modalProps(REPOSITORY_KEYS.CERTIFIED)}
        onCreated={() => refresh(REPOSITORY_KEYS.CERTIFIED)}
      />
    </Stack>
  );
};

export default RepositoriesHubPage;
