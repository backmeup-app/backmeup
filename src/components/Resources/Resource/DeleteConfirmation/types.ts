export type TDeleteConfirmation = {
  name: string;
  isOpen: boolean;
  handleDelete: () => void;
  onClose: () => void;
};
