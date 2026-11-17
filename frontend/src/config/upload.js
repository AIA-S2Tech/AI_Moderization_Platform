// File upload limits (T-57). FileUpload reads these, so changing the allowed
// types or size is a config change only.
export const UPLOAD_LIMITS = {
  allowedTypes: ["zip", "pdf", "docx", "xlsx", "vsdx"],
  maxSizeMB: 50,
};
