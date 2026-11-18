// ApprovedActionsPanel (T-15).
// "APPROVED ACTIONS" title in the workspace theme colour + one ActionListItem per
// action in config/workspaces.js. Click → ConfirmDialog "Run '<action>'?" →
// workspace service → Toast. The list comes only from config.
//
// Props:
//   workspaceId      : workspace key, e.g. "legacyDiscovery"
//   title            : section title (default "Approved Actions")
//   onActionComplete : optional (artifact, action) => void – after a successful run,
//                      e.g. reload Recent Artifacts
//   ...rest          : props for the outer box
//
// Example:
//   <ApprovedActionsPanel workspaceId="legacyDiscovery" onActionComplete={reload} />

import React, { useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import ActionListItem from "../common/ActionListItem";
import ConfirmDialog from "../common/ConfirmDialog";
import { useAppToast } from "../common/Toast";
import { getWorkspaceConfig } from "../../config/workspaces";
import { runWorkspaceAction } from "../../services/workspace.service";

const titleColor = { navy: "navy.800", red: "red.500" };

const ApprovedActionsPanel = ({ workspaceId, title = "Approved Actions", onActionComplete, ...rest }) => {
  const config = getWorkspaceConfig(workspaceId);
  const toast = useAppToast();
  const [pendingAction, setPendingAction] = useState(null); // waiting for confirm
  const [runningId, setRunningId] = useState(null); // service call in progress

  if (!config) return null;
  const theme = config.theme === "red" ? "red" : "navy";

  const runAction = async () => {
    const action = pendingAction;
    setPendingAction(null);
    setRunningId(action.id);
    try {
      const artifact = await runWorkspaceAction(workspaceId, action);
      toast.success(`'${action.label}' started – "${artifact.name}" added to Recent Artifacts.`);
      if (onActionComplete) onActionComplete(artifact, action);
    } catch (err) {
      toast.error(`Couldn't run '${action.label}'. Please try again.`);
    } finally {
      setRunningId(null);
    }
  };

  return (
    <Box {...rest}>
      <Text
        as="h3"
        fontSize="sm"
        fontWeight="bold"
        letterSpacing="wider"
        textTransform="uppercase"
        color={titleColor[theme]}
        mb={3}
      >
        {title}
      </Text>

      <VStack as="ul" listStyleType="none" spacing={2} align="stretch" aria-label={title}>
        {config.actions.map((action) => (
          <Box as="li" key={action.id}>
            <ActionListItem
              icon={action.icon}
              label={action.label}
              tone={theme}
              isDisabled={runningId !== null}
              onClick={() => setPendingAction(action)}
            />
          </Box>
        ))}
      </VStack>

      <ConfirmDialog
        isOpen={Boolean(pendingAction)}
        onClose={() => setPendingAction(null)}
        onConfirm={runAction}
        title={pendingAction ? `Run '${pendingAction.label}'?` : ""}
        message="The AI workflow will create a new artifact with status 'Generated' in this workspace."
        confirmLabel="Run"
      />
    </Box>
  );
};

export default ApprovedActionsPanel;
