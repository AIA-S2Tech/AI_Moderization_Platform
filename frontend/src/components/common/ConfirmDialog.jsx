import React from "react";
import Button from "./Button";
import Modal from "./Modal";

// Yes/No confirmation built on Modal. e.g.
// <ConfirmDialog isOpen={isOpen} onClose={onClose} onConfirm={runAction}
//   title="Run 'Generate System Overview'?"
//   message="The AI workflow will create a new artifact with status 'Generated' in this workspace."
//   confirmLabel="Run" />
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="md"
    footer={
      <>
        <Button variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </>
    }
  >
    {message}
  </Modal>
);

export default ConfirmDialog;
