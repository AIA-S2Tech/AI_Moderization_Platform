// Content of the shared info section under the repository pages and the hub.
// RepositoryInfoSection reads it, so changing the text is a config change only.
export const REPOSITORY_INFO = {
  flow: {
    title: "Recommended Use and Flow",
    steps: [
      { title: "Client / Project Evidence", description: "Upload and Organize", tone: "navy" },
      { title: "AI Processing and Working Artifacts", description: "Generate, Review, Refine", tone: "red" },
      { title: "Validated Knowledge", description: "Certify and Publish", tone: "navy" },
    ],
  },
  principles: {
    title: "Key Principles",
    items: [
      "Maintain clear separation between source evidence, working artifacts, and certified knowledge.",
      "Do not modify original source evidence.",
      "Track versions, reviewers, and traceability at each stage.",
      "Only move artifacts to the Certified Knowledge Repository after completing the defined validation process.",
    ],
  },
  benefits: {
    title: "Benefits",
    items: [
      "Ensures transparency and traceability.",
      "Maintains a clear validation trail.",
      "Prevents confusion between AI-generated and approved knowledge.",
      "Supports consistent, repeatable project execution.",
      "Provides a reliable foundation for client deliverables and future modernization activities.",
    ],
  },
};

// Page title block of the Repositories hub (/repositories).
export const REPOSITORY_HUB = {
  title: "Project Repositories",
  subtitle:
    "Separate management of source evidence, working/generated artifacts, and certified knowledge to ensure transparency, traceability, and a clear validation path.",
};
