// Content for the public About page (/about).
// Pages render this config – edit the wording here, not in the components.

import { WORKSPACE_ROUTES } from "./routes";

export const ABOUT_HERO = {
  eyebrow: "About the platform",
  title: "S2Tech AI Modernization Accelerator",
  description:
    "A methodology-driven platform for modernizing legacy systems. AI does the heavy lifting on discovery and analysis, and your practitioners and subject-matter experts review and certify every result before anyone relies on it.",
};

// "How work flows" card in the hero. tone: navy | red
export const WORK_FLOW_STEPS = [
  {
    title: "Client / project evidence",
    description: "Upload and organize source code, documents and data models",
    tone: "navy",
  },
  {
    title: "AI processing & working artifacts",
    description: "Generate, review and refine",
    tone: "red",
  },
  {
    title: "Validated knowledge",
    description: "Certify and publish for decisions and delivery",
    tone: "navy",
  },
];

export const CAPABILITIES_SECTION = {
  title: "Five capabilities, one connected method",
  description:
    "Each capability has its own workspace with approved AI actions, working artifacts and a summary of where it stands. What one capability certifies becomes the input for the next.",
};

// Summary + typical outputs per methodology workspace, keyed like WORKSPACE_ROUTES.
const CAPABILITY_DETAILS = {
  legacyDiscovery: {
    summary: "Understand what exists today, how it works, and what evidence supports it.",
    outputs:
      "system overview, application inventory, process flows, dependency analysis, interface inventory, evidence gaps and SME questions.",
  },
  businessRuleIntelligence: {
    summary: "Extract, validate and organize business rules and business intent.",
    outputs:
      "business rules catalog, rule traceability, conflicting and unconfirmed rules, decision tables, SME validation packages and test scenarios.",
  },
  modernizationAssessment: {
    summary: "Assess what should change and the impact of options.",
    outputs:
      "change candidates, evaluated options, risks, a data quality view and an assessment report.",
  },
  targetedModernization: {
    summary: "Define the right modernization path and sequence.",
    outputs: "modernization path, phased plan, reuse opportunities and a roadmap.",
  },
  aiCodeTransformation: {
    summary: "Accelerate code transformation with AI under human control.",
    outputs:
      "code analysis, refactoring ideas, generated tests, converted code, and reviewed and validated code changes.",
  },
};

// Same names and order as the workspace nav; even steps use the red tone.
export const CAPABILITIES = WORKSPACE_ROUTES.map((w) => ({
  key: w.key,
  step: w.step,
  label: w.label,
  tone: w.step % 2 === 0 ? "red" : "navy",
  ...CAPABILITY_DETAILS[w.key],
}));

export const REPOSITORIES_SECTION = {
  title: "Three repositories keep evidence, drafts and approved knowledge apart",
  description:
    "Nothing AI-generated is treated as approved until it has been reviewed, validated and certified, and every certified item traces back to its source evidence.",
};

export const REPOSITORY_OVERVIEW = [
  {
    key: "evidence",
    title: "Evidence Repository",
    subtitle: "Source code, documents and other project evidence",
    tone: "navy",
    points: [
      "Stores the source evidence provided by the client or gathered by the team.",
      "Code, requirements, architecture diagrams, data models, procedures, policies, tests and meeting notes.",
      "Each item carries metadata: source, date, classification and version.",
      "Original evidence is never modified.",
    ],
  },
  {
    key: "artifacts",
    title: "Working / Generated Artifacts",
    subtitle: "AI-generated and practitioner working artifacts",
    tone: "red",
    points: [
      "Draft deliverables, intermediate outputs and analysis results.",
      "Items move through review: Generated → In Review → Revised → Ready for Certification.",
      "Multiple versions are kept.",
      "Not yet certified, so not treated as approved knowledge.",
    ],
  },
  {
    key: "certified",
    title: "Certified Knowledge",
    subtitle: "Validated and approved project knowledge",
    tone: "navy",
    points: [
      "Final deliverables, certified analyses and validated business rules.",
      "Added only after the review and validation process is complete.",
      "Each item records its version, certification date, approvers and source evidence.",
      "The authoritative reference for client deliverables.",
    ],
  },
];

// Review pipeline under the repository cards. isApproved = green tint.
export const REVIEW_PIPELINE = [
  { title: "Generated", description: "AI workflow completed" },
  { title: "Professional Review", description: "Technical review by a practitioner" },
  { title: "SME / Technical Validation", description: "Confirmed by subject-matter experts" },
  { title: "Certified", description: "Approved and traceable", isApproved: true },
  { title: "Decision-Ready", description: "Ready for a decision or handoff", isApproved: true },
];

export const PRINCIPLES = {
  title: "Principles we build on",
  items: [
    "Keep source evidence, working artifacts and certified knowledge clearly separate.",
    "Never modify original source evidence.",
    "Track versions, reviewers and traceability at every stage.",
    "Only certify artifacts after the defined validation process is complete.",
  ],
};

export const TEAM_BENEFITS = {
  title: "What teams get",
  items: [
    "Transparency and traceability from evidence to decision.",
    "A clear validation trail for every deliverable.",
    "No confusion between AI-generated drafts and approved knowledge.",
    "Consistent, repeatable project execution.",
    "A reliable foundation for client deliverables and future modernization work.",
  ],
};

export const AUDIENCES = {
  title: "Who uses it",
  items: [
    {
      title: "Delivery practitioners",
      description:
        "Run approved AI actions, review generated artifacts and prepare them for certification.",
      tone: "navy",
    },
    {
      title: "Subject-matter experts",
      description:
        "Answer open questions, validate business rules and confirm what the evidence shows.",
      tone: "red",
    },
    {
      title: "Program and client leaders",
      description:
        "Follow progress across capabilities and rely on certified knowledge for decisions.",
      tone: "navy",
    },
  ],
};

export const ABOUT_CTA = {
  title: "Modernizing a legacy system?",
  description: "Tell us about your system and we will walk you through the accelerator.",
  buttonLabel: "Contact us",
};
