// Page: Legacy Discovery Workspace (T-21) – /workspaces/legacy-discovery
// Config only: everything comes from config/workspaces.js (legacyDiscovery) and
// services/workspace.service.js through the MethodologyWorkspaceTemplate (T-17).

import React from "react";
import MethodologyWorkspaceTemplate from "../../components/workspace/MethodologyWorkspaceTemplate";
import { WORKSPACE_KEYS } from "../../config/workspaces";

const LegacyDiscoveryWorkspacePage = () => (
  <MethodologyWorkspaceTemplate workspaceId={WORKSPACE_KEYS.LEGACY_DISCOVERY} />
);

export default LegacyDiscoveryWorkspacePage;
