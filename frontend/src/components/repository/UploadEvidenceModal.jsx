import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload";
import Modal from "../common/Modal";
import { useAppToast } from "../common/Toast";
import { EVIDENCE_OPTIONS } from "../../config/evidence";
import { CAPABILITY_OPTIONS, REPOSITORY_KEYS } from "../../config/repositories";
import { addRepositoryItem } from "../../services/repository.service";

const FORM_ID = "upload-evidence-form";
const EMPTY_FORM = { type: "", source: "", classification: "", version: "", capability: "" };

const fieldProps = { borderColor: "border.default", color: "text.primary" };
const labelProps = { fontWeight: "bold", color: "text.primary" };

// Dropdown field of the metadata form.
const SelectField = ({ name, label, placeholder, options, value, error, onChange }) => (
  <FormControl isInvalid={!!error}>
    <FormLabel {...labelProps}>{label}</FormLabel>
    <Select name={name} value={value} onChange={onChange} placeholder={placeholder} {...fieldProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

const toOptions = (list) => list.map((item) => ({ value: item, label: item }));

// "+ Upload Evidence" pop-up of the Evidence Repository.
// Files (FileUpload) + metadata → checks → repository service → toast. The same
// metadata is saved for every file in one upload. e.g.
// <UploadEvidenceModal isOpen={isOpen} onClose={onClose} onUploaded={reloadList} />
const UploadEvidenceModal = ({ isOpen, onClose, onUploaded }) => {
  const { types, sources, classifications } = EVIDENCE_OPTIONS;
  const toast = useAppToast();
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Start empty every time the pop-up opens.
  useEffect(() => {
    if (isOpen) {
      setFiles([]);
      setProgress({});
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFilesChange = (next) => {
    setFiles(next);
    setErrors((prev) => ({ ...prev, files: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!files.length) next.files = "Add at least one file";
    if (!form.type) next.type = "Select an evidence type";
    if (!form.source) next.source = "Select a source";
    if (!form.classification) next.classification = "Select a classification";
    if (!form.version.trim()) next.version = "Version is required";
    if (!form.capability) next.capability = "Select a capability";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    setIsSaving(true);
    try {
      // One item per file; each bar fills when its file is saved.
      for (const file of files) {
        setProgress((prev) => ({ ...prev, [file.name]: 10 }));
        await addRepositoryItem(REPOSITORY_KEYS.EVIDENCE, {
          name: file.name,
          type: form.type,
          source: form.source,
          classification: form.classification,
          version: form.version.trim(),
          capability: form.capability,
          dateAdded: today,
        });
        setProgress((prev) => ({ ...prev, [file.name]: 100 }));
      }
      toast.success(
        files.length === 1 ? `"${files[0].name}" uploaded` : `${files.length} evidence files uploaded`
      );
      onUploaded?.();
      onClose();
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Evidence"
      size="2xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose} isDisabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} isLoading={isSaving} loadingText="Uploading…">
            Upload
          </Button>
        </>
      }
    >
      <Stack as="form" id={FORM_ID} noValidate onSubmit={handleSubmit} spacing={4}>
        <FormControl isInvalid={!!errors.files}>
          <FileUpload onFilesChange={handleFilesChange} progress={progress} />
          {errors.files && (
            <Text role="alert" fontSize="sm" color="text.alert" mt={1}>
              {errors.files}
            </Text>
          )}
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <SelectField
            name="type"
            label="Evidence type"
            placeholder="Select type"
            options={toOptions(types)}
            value={form.type}
            error={errors.type}
            onChange={handleChange}
          />
          <SelectField
            name="source"
            label="Source"
            placeholder="Select source"
            options={toOptions(sources)}
            value={form.source}
            error={errors.source}
            onChange={handleChange}
          />
          <SelectField
            name="classification"
            label="Classification"
            placeholder="Select classification"
            options={toOptions(classifications)}
            value={form.classification}
            error={errors.classification}
            onChange={handleChange}
          />
          <FormControl isInvalid={!!errors.version}>
            <FormLabel {...labelProps}>Version</FormLabel>
            <Input name="version" value={form.version} onChange={handleChange} placeholder="v1.0" {...fieldProps} />
            <FormErrorMessage>{errors.version}</FormErrorMessage>
          </FormControl>
          <SelectField
            name="capability"
            label="Capability"
            placeholder="Select capability"
            options={CAPABILITY_OPTIONS}
            value={form.capability}
            error={errors.capability}
            onChange={handleChange}
          />
        </SimpleGrid>
      </Stack>
    </Modal>
  );
};

export default UploadEvidenceModal;
