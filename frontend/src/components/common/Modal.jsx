import React from "react";
import {
  Modal as ChakraModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

// Shared pop-up. Closes on ESC and overlay click; keyboard focus stays inside
// while open (focus trap) and returns to the opening button on close. e.g.
// <Modal isOpen={isOpen} onClose={onClose} title="New Folder" size="md"
//   footer={<><Button variant="outline" onClick={onClose}>Cancel</Button><Button>Create</Button></>}>
//   …form…
// </Modal>
const Modal = ({ isOpen, onClose, title, children, footer, size = "md" }) => (
  <ChakraModal isOpen={isOpen} onClose={onClose} size={size} isCentered>
    <ModalOverlay />
    <ModalContent
      bg="bg.surface"
      borderRadius="xl"
      boxShadow="modal"
      mx="gutter"
    >
      <ModalHeader fontSize="lg" fontWeight="bold" color="text.primary">
        {title}
      </ModalHeader>
      <ModalBody fontSize="sm" color="text.secondary">
        {children}
      </ModalBody>
      {footer && <ModalFooter gap={3}>{footer}</ModalFooter>}
    </ModalContent>
  </ChakraModal>
);

export default Modal;
