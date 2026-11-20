// Page: Modernization Assessment Workspace (T-23) – /workspaces/modernization-assessment
// Config only: everything comes from config/workspaces.js (modernizationAssessment) and
// services/workspace.service.js through the MethodologyWorkspaceTemplate (T-17).

import React from "react";
import MethodologyWorkspaceTemplate from "../../components/workspace/MethodologyWorkspaceTemplate";
import { WORKSPACE_KEYS } from "../../config/workspaces";

const ModernizationAssessmentWorkspacePage = () => (
  <MethodologyWorkspaceTemplate workspaceId={WORKSPACE_KEYS.MODERNIZATION_ASSESSMENT} />
);

export default ModernizationAssessmentWorkspacePage;
