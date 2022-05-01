import { FC } from "react";
import {
  Modal as ChakraModal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { TModal } from ".";

export const Modal: FC<TModal> = ({ title, isOpen, onClose, children }) => {
  return (
    <ChakraModal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="oswald">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
