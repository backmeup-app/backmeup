import { FC } from "react";
import {
  Modal as ChakraModal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { TModal } from ".";

export const Modal: FC<TModal> = ({
  title,
  isOpen,
  onClose,
  children,
  isCentered = true,
}) => {
  return (
    <ChakraModal
      onClose={onClose}
      isOpen={isOpen}
      size="xl"
      isCentered={isCentered}
    >
      <ModalOverlay />
      <ModalContent pb={4} borderRadius={"sm"} w={["90%", "100%"]}>
        <ModalHeader fontSize={{ base: "0.95rem", sm: "md" }}>
          {title}
        </ModalHeader>
        <ModalCloseButton marginTop={{ base: "3px", sm: "0" }} />
        <ModalBody pt={0}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
