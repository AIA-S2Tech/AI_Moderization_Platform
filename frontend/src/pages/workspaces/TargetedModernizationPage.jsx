import React from "react";
import MethodologyWorkspaceTemplate from "../../components/workspace/MethodologyWorkspaceTemplate";
import { WORKSPACE_KEYS } from "../../config/workspaces";

// Targeted Modernization Workspace (/workspaces/targeted-modernization).
// Template + config only – title, red theme, actions and summary come from
// config/workspaces.js; status, % complete and numbers from workspace.service.js.
const TargetedModernizationPage = () => (
  <MethodologyWorkspaceTemplate workspaceId={WORKSPACE_KEYS.TARGETED_MODERNIZATION} />
);

export default TargetedModernizationPage;
