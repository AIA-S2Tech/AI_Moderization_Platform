import React from "react";
import MethodologyWorkspaceTemplate from "../../components/workspace/MethodologyWorkspaceTemplate";
import { WORKSPACE_KEYS } from "../../config/workspaces";

// AI-Assisted Code Transformation Workspace (/workspaces/ai-code-transformation).
// Template + config only – title, navy theme, actions and snapshot come from
// config/workspaces.js; status, % complete and numbers from workspace.service.js.
const AiCodeTransformationPage = () => (
  <MethodologyWorkspaceTemplate workspaceId={WORKSPACE_KEYS.AI_CODE_TRANSFORMATION} />
);

export default AiCodeTransformationPage;
