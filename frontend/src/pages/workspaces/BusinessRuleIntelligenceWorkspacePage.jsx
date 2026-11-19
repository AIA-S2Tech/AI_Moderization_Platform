// Page: Business Rule Intelligence Workspace (T-22) – /workspaces/business-rule-intelligence
// Config only: everything comes from config/workspaces.js (businessRuleIntelligence) and
// services/workspace.service.js through the MethodologyWorkspaceTemplate (T-17).

import React from "react";
import MethodologyWorkspaceTemplate from "../../components/workspace/MethodologyWorkspaceTemplate";
import { WORKSPACE_KEYS } from "../../config/workspaces";

const BusinessRuleIntelligenceWorkspacePage = () => (
  <MethodologyWorkspaceTemplate workspaceId={WORKSPACE_KEYS.BUSINESS_RULE_INTELLIGENCE} />
);

export default BusinessRuleIntelligenceWorkspacePage;
