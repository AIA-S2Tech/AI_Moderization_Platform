import React, { useRef, useState } from "react";
import { Box, CloseButton, Flex, Icon, Stack, Text, chakra } from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";
import { UPLOAD_LIMITS } from "../../config/upload";

const getExtension = (name) => name.split(".").pop().toLowerCase();

// Drag & drop + browse, multiple files, type / size checks from config/upload.js.
// The page gets the accepted files via onFilesChange and can show upload
// progress per file with 'progress' = { [fileName]: 0-100 }. e.g.
// <FileUpload onFilesChange={setFiles} progress={{ "JCL_Procedures.pdf": 100 }} />
const FileUpload = ({ onFilesChange, progress = {} }) => {
  const { allowedTypes, maxSizeMB } = UPLOAD_LIMITS;
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (fileList) => {
    const accepted = [];
    const rejected = [];

    Array.from(fileList).forEach((file) => {
      if (!allowedTypes.includes(getExtension(file.name))) {
        rejected.push(`${file.name} – file type not allowed`);
      } else if (file.size > maxSizeMB * 1024 * 1024) {
        rejected.push(`${file.name} – file larger than ${maxSizeMB} MB`);
      } else if (!files.some((f) => f.name === file.name)) {
        accepted.push(file);
      }
    });

    const next = [...files, ...accepted];
    setFiles(next);
    setErrors(rejected);
    onFilesChange?.(next);
  };

  const removeFile = (name) => {
    const next = files.filter((f) => f.name !== name);
    setFiles(next);
    onFilesChange?.(next);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <Stack spacing={3}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        p={6}
        border="2px dashed"
        borderColor={isDragging ? "navy.500" : "border.strong"}
        borderRadius="lg"
        bg={isDragging ? "bg.navTint" : "bg.surface"}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Icon as={FiUploadCloud} boxSize="28px" color="navy.800" mb={2} aria-hidden="true" />
        <Text fontSize="md" color="text.primary">
          Drag & drop files here or{" "}
          <chakra.button
            type="button"
            color="text.link"
            fontWeight="semibold"
            textDecoration="underline"
            _focusVisible={{ boxShadow: "focus", outline: "none" }}
            onClick={() => inputRef.current?.click()}
          >
            Browse
          </chakra.button>
        </Text>
        <Text fontSize="sm" color="text.muted" mt={1}>
          {allowedTypes.join(", ")} · max {maxSizeMB} MB each
        </Text>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept={allowedTypes.map((t) => `.${t}`).join(",")}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = ""; // allow picking the same file again after removing it
          }}
        />
      </Flex>

      {errors.length > 0 && (
        <Box role="alert">
          {errors.map((msg) => (
            <Text key={msg} fontSize="sm" color="text.alert">
              {msg}
            </Text>
          ))}
        </Box>
      )}

      {files.map((file) => {
        const value = progress[file.name] ?? 0;
        return (
          <Flex key={file.name} align="center" gap={4}>
            <Text flex="0 0 40%" fontSize="sm" color="text.primary" noOfLines={1} title={file.name}>
              {file.name}
            </Text>
            <Box
              flex="1"
              h="8px"
              bg="bg.subtle"
              borderRadius="full"
              overflow="hidden"
              role="progressbar"
              aria-label={`Upload progress for ${file.name}`}
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <Box
                h="100%"
                w={`${value}%`}
                bg={value >= 100 ? "status.success.fg" : "navy.800"}
                borderRadius="full"
                transition="width 0.2s ease"
              />
            </Box>
            <CloseButton
              size="sm"
              color="text.muted"
              aria-label={`Remove ${file.name}`}
              onClick={() => removeFile(file.name)}
            />
          </Flex>
        );
      })}
    </Stack>
  );
};

export default FileUpload;
