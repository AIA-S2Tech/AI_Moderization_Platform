import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { useAppToast } from "../common/Toast";
import { CAPABILITY_OPTIONS, REPOSITORY_KEYS } from "../../config/repositories";
import { addRepositoryItem, getRepositoryItems } from "../../services/repository.service";

const FORM_ID = "new-folder-form";
const EMPTY_FORM = { name: "", capability: "" };

// "+ New Folder" pop-up of the Working/Generated Artifact Repository.
// Name + capability → checks → repository service → toast. e.g.
// <NewFolderModal isOpen={isOpen} onClose={onClose} onCreated={reloadItems} />
const NewFolderModal = ({ isOpen, onClose, onCreated }) => {
  const toast = useAppToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Start with an empty form every time the pop-up opens.
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const nextErrors = {};
    if (!name) nextErrors.name = "Folder name is required";
    if (!form.capability) nextErrors.capability = "Select a capability";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSaving(true);
    try {
      const items = await getRepositoryItems(REPOSITORY_KEYS.ARTIFACTS);
      if (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
        setErrors({ name: "A folder or artifact with this name already exists" });
        return;
      }

      const folder = await addRepositoryItem(REPOSITORY_KEYS.ARTIFACTS, {
        name,
        fileType: "folder",
        capability: form.capability,
        lastUpdated: new Date().toISOString().slice(0, 10),
      });
      toast.success(`Folder "${folder.name}" created`);
      onCreated?.(folder);
      onClose();
    } catch {
      toast.error("Could not create the folder. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Folder"
      size="xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose} isDisabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} isLoading={isSaving} loadingText="Creating…">
            Create
          </Button>
        </>
      }
    >
      <SimpleGrid as="form" id={FORM_ID} noValidate onSubmit={handleSubmit} columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel fontWeight="bold" color="text.primary">
            Folder name
          </FormLabel>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Business Rules – Draft"
            borderColor="border.default"
            autoFocus
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.capability}>
          <FormLabel fontWeight="bold" color="text.primary">
            Capability
          </FormLabel>
          <Select
            name="capability"
            value={form.capability}
            onChange={handleChange}
            placeholder="Select capability"
            borderColor="border.default"
          >
            {CAPABILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.capability}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>
    </Modal>
  );
};

export default NewFolderModal;
