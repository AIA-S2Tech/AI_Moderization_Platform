// Options for the Add Certified Item pop-up. AddCertifiedItemModal reads them,
// so changing the ready status or the type list is a config change only.
export const CERTIFICATION_OPTIONS = {
  // Artifacts with this status can be certified.
  readyStatus: "Ready for Certification",
  types: ["Report", "Inventory", "Catalog", "Diagram", "Matrix", "Table", "Test"],
};
