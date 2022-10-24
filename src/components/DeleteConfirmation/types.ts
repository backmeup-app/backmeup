export type TDeleteConfirmation = {
  handleDelete: () => void;
  isOpen: boolean;
  networkOperation?: string;
  onClose: () => void;
  title: string | JSX.Element;
};
