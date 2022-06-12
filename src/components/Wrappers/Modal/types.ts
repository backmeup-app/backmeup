import { ModalProps } from "@chakra-ui/modal";

export type TModal = ModalProps & {
  title: string | JSX.Element;
  isOpen: boolean;
  onClose: () => void;
};
