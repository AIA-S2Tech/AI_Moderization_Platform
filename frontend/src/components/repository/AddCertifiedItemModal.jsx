import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { useAppToast } from "../common/Toast";
import { CERTIFICATION_OPTIONS } from "../../config/certification";
import { REPOSITORY_KEYS } from "../../config/repositories";
import { addRepositoryItem, getRepositoryItems } from "../../services/repository.service";

const FORM_ID = "add-certified-item-form";
const EMPTY_FORM = {
  artifactId: "",
  version: "",
  approver: "",
  certifiedDate: "",
  evidenceIds: [],
  type: "",
};

const fieldProps = { borderColor: "border.default", color: "text.primary" };
const labelProps = { fontWeight: "bold", color: "text.primary" };

// "+ Add Certified Item" pop-up of the Certified Knowledge Repository.
// Pick an artifact that is Ready for Certification, add version, approver,
// certified date, type and the source evidence it came from (traceability). e.g.
// <AddCertifiedItemModal isOpen={isOpen} onClose={onClose} onCreated={reloadItems} />
const AddCertifiedItemModal = ({ isOpen, onClose, onCreated }) => {
  const { readyStatus, types } = CERTIFICATION_OPTIONS;
  const toast = useAppToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [artifacts, setArtifacts] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [approvers, setApprovers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Empty form + fresh lists every time the pop-up opens.
  useEffect(() => {
    if (!isOpen) return undefined;
    let isCurrent = true;
    setForm(EMPTY_FORM);
    setErrors({});
    setIsLoading(true);

    Promise.all([
      getRepositoryItems(REPOSITORY_KEYS.ARTIFACTS),
      getRepositoryItems(REPOSITORY_KEYS.EVIDENCE),
      getRepositoryItems(REPOSITORY_KEYS.CERTIFIED),
    ])
      .then(([artifactItems, evidenceItems, certifiedItems]) => {
        if (!isCurrent) return;
        setArtifacts(artifactItems.filter((item) => item.status === readyStatus));
        setEvidence(evidenceItems);
        setApprovers([...new Set(certifiedItems.map((item) => item.approver).filter(Boolean))].sort());
      })
      .catch(() => isCurrent && toast.error("Could not load the form data."))
      .finally(() => isCurrent && setIsLoading(false));

    return () => {
      isCurrent = false;
    };
  }, [isOpen, readyStatus, toast]);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleChange = (e) => setField(e.target.name, e.target.value);

  const validate = () => {
    const next = {};
    if (!form.artifactId) next.artifactId = "Select an artifact";
    if (!form.version.trim()) next.version = "Version is required";
    if (!form.approver) next.approver = "Select an approver";
    if (!form.certifiedDate) next.certifiedDate = "Certified date is required";
    if (!form.evidenceIds.length) next.evidenceIds = "Link at least one source evidence";
    if (!form.type) next.type = "Select a type";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const artifact = artifacts.find((item) => item.id === form.artifactId);
    setIsSaving(true);
    try {
      const item = await addRepositoryItem(REPOSITORY_KEYS.CERTIFIED, {
        name: artifact.name,
        fileType: artifact.fileType,
        capability: artifact.capability,
        type: form.type,
        version: form.version.trim(),
        certifiedDate: form.certifiedDate,
        approver: form.approver,
        sourceEvidenceIds: form.evidenceIds,
      });
      toast.success(`"${item.name}" certified`);
      onCreated?.(item);
      onClose();
    } catch {
      toast.error("Could not certify the item. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const evidenceLabel = form.evidenceIds.length
    ? `${form.evidenceIds.length} evidence selected`
    : "Select evidence…";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Certified Item"
      size="2xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose} isDisabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} isLoading={isSaving} loadingText="Certifying…">
            Certify
          </Button>
        </>
      }
    >
      <SimpleGrid as="form" id={FORM_ID} noValidate onSubmit={handleSubmit} columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl isInvalid={!!errors.artifactId}>
          <FormLabel {...labelProps}>Artifact (Ready for Certification)</FormLabel>
          <Select
            name="artifactId"
            value={form.artifactId}
            onChange={handleChange}
            placeholder={isLoading ? "Loading…" : "Select artifact"}
            isDisabled={isLoading}
            {...fieldProps}
          >
            {artifacts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} {item.version}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.artifactId}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.version}>
          <FormLabel {...labelProps}>Version</FormLabel>
          <Input name="version" value={form.version} onChange={handleChange} placeholder="v1.0" {...fieldProps} />
          <FormErrorMessage>{errors.version}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.approver}>
          <FormLabel {...labelProps}>Approver</FormLabel>
          <Select
            name="approver"
            value={form.approver}
            onChange={handleChange}
            placeholder={isLoading ? "Loading…" : "Select approver"}
            isDisabled={isLoading}
            {...fieldProps}
          >
            {approvers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.approver}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.certifiedDate}>
          <FormLabel {...labelProps}>Certified date</FormLabel>
          <Input
            type="date"
            name="certifiedDate"
            value={form.certifiedDate}
            onChange={handleChange}
            {...fieldProps}
          />
          <FormErrorMessage>{errors.certifiedDate}</FormErrorMessage>
        </FormControl>

        {/* More than one evidence can be linked, so this is a checkbox menu */}
        <FormControl isInvalid={!!errors.evidenceIds}>
          <FormLabel {...labelProps}>Linked source evidence</FormLabel>
          <Menu closeOnSelect={false} placement="bottom-start" matchWidth isLazy>
            <MenuButton
              as={Button}
              variant="outline"
              w="full"
              h={10}
              px={4}
              justifyContent="space-between"
              fontSize="md"
              fontWeight="normal"
              color={form.evidenceIds.length ? "text.primary" : "text.muted"}
              borderColor={errors.evidenceIds ? "text.alert" : "border.default"}
              rightIcon={<ChevronDownIcon />}
              isDisabled={isLoading}
            >
              <Text as="span" noOfLines={1} textAlign="left">
                {evidenceLabel}
              </Text>
            </MenuButton>
            <MenuList maxH="240px" overflowY="auto" zIndex="dropdown" boxShadow="dropdown">
              <MenuOptionGroup
                type="checkbox"
                value={form.evidenceIds}
                onChange={(ids) => setField("evidenceIds", ids)}
              >
                {evidence.map((item) => (
                  <MenuItemOption key={item.id} value={item.id} fontSize="sm" color="text.primary">
                    {item.name}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <FormErrorMessage>{errors.evidenceIds}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.type}>
          <FormLabel {...labelProps}>Type</FormLabel>
          <Select name="type" value={form.type} onChange={handleChange} placeholder="Select type" {...fieldProps}>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.type}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>
    </Modal>
  );
};

export default AddCertifiedItemModal;
