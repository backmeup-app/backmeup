import { ModalProps } from "@chakra-ui/modal";

export type TModal = ModalProps & {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};
