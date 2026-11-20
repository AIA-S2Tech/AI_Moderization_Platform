// Dashboard Key Metrics (T-25) – the 9 tiles under the Capability Progress table.
// Labels, icons and formats live here; the values come from
// services/dashboard.service.js (keyMetrics), keyed by `id`.
//   format: number (128) | percent (78%) | currency ($412) – see formatStatValue
//   tone  : StatCard tone (default | red | amber | green), optional

import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckSquare,
  FiCpu,
  FiFilePlus,
  FiFileText,
  FiHelpCircle,
  FiRotateCcw,
  FiUser,
} from "react-icons/fi";

export const KEY_METRICS = [
  { id: "evidenceCoverage", label: "Evidence Coverage", icon: FiFileText, format: "percent" },
  { id: "artifactsGenerated", label: "Artifacts Generated", icon: FiFilePlus, format: "number" },
  { id: "artifactsValidated", label: "Artifacts Validated", icon: FiCheckSquare, format: "number" },
  { id: "openSmeQuestions", label: "Open SME Questions", icon: FiHelpCircle, format: "number" },
  { id: "unresolvedAssumptions", label: "Unresolved Assumptions", icon: FiAlertCircle, format: "number" },
  { id: "conflictingEvidence", label: "Conflicting Evidence", icon: FiAlertTriangle, format: "number" },
  { id: "humanReviewHours", label: "Human Review Hours", icon: FiUser, format: "number" },
  { id: "aiProcessingCost", label: "AI Processing (Est. Cost)", icon: FiCpu, format: "currency" },
  { id: "rework", label: "Rework", icon: FiRotateCcw, format: "percent" },
];
