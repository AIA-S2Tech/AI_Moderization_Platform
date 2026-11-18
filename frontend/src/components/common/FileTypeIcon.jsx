import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  BsFileEarmarkExcelFill,
  BsFileEarmarkFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkRuledFill,
  BsFileEarmarkWordFill,
  BsFileEarmarkZipFill,
} from "react-icons/bs";

// Icon + format colour per file type. Colours are theme tokens only.
export const FILE_TYPES = {
  zip: { icon: BsFileEarmarkZipFill, color: "accent.amber.fg", label: "ZIP archive" },
  pdf: { icon: BsFileEarmarkPdfFill, color: "red.500", label: "PDF document" },
  docx: { icon: BsFileEarmarkWordFill, color: "status.info.fg", label: "Word document" },
  xlsx: { icon: BsFileEarmarkExcelFill, color: "status.success.fg", label: "Excel workbook" },
  vsdx: { icon: BsFileEarmarkRuledFill, color: "navy.500", label: "Visio diagram" },
  generic: { icon: BsFileEarmarkFill, color: "text.muted", label: "File" },
};

// "Data Model ERD.vsdx" → "vsdx"; also accepts a bare extension like "PDF" or ".pdf".
export const getFileType = (fileNameOrExt = "") => {
  const ext = String(fileNameOrExt).trim().toLowerCase().split(".").pop();
  return FILE_TYPES[ext] ? ext : "generic";
};

const FileTypeIcon = ({ fileName, type, ...rest }) => {
  const config = FILE_TYPES[getFileType(type || fileName)];

  return (
    <Icon
      as={config.icon}
      boxSize="20px"
      color={config.color}
      flexShrink={0}
      aria-label={config.label}
      role="img"
      {...rest}
    />
  );
};

export default FileTypeIcon;
