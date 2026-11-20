// Project Repositories cards on the dashboard (T-28). RepositorySummaryPanel reads
// it, so the cards are config only. Item count and last updated are live data –
// the page passes them in ('summaries').
import { FiFilePlus, FiFileText, FiShield } from "react-icons/fi";
import { REPOSITORY_KEYS, getRepositoryConfig } from "./repositories";

// tone: colour of the icon circle – navy | purple | green
export const REPOSITORY_SUMMARY_CARDS = [
  {
    key: REPOSITORY_KEYS.EVIDENCE,
    icon: FiFileText,
    tone: "navy",
    title: "Evidence Repository",
    description: "Source material and client-provided evidence",
    path: getRepositoryConfig(REPOSITORY_KEYS.EVIDENCE).path,
  },
  {
    key: REPOSITORY_KEYS.ARTIFACTS,
    icon: FiFilePlus,
    tone: "purple",
    title: "Working / Generated Artifact Repository",
    description: "AI-generated and working artifacts awaiting validation",
    path: getRepositoryConfig(REPOSITORY_KEYS.ARTIFACTS).path,
  },
  {
    key: REPOSITORY_KEYS.CERTIFIED,
    icon: FiShield,
    tone: "green",
    title: "Certified Knowledge Repository",
    description: "Validated and certified knowledge ready for reuse",
    path: getRepositoryConfig(REPOSITORY_KEYS.CERTIFIED).path,
  },
];
