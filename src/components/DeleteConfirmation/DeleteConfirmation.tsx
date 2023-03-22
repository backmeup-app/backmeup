import { FC, useContext, Dispatch } from "react";
import { chakra, Flex, VStack, HStack, Button } from "@chakra-ui/react";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { TDeleteConfirmation } from "./types";
import { Modal } from "..";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction } from "../../store";

export const DeleteConfirmation: FC<TDeleteConfirmation> = ({
  isOpen,
  onClose,
  title,
  children,
  networkOperation,
  handleDelete,
}) => {
  const [{ loading, networkOperation: networkOperationCtxt }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const DangerIcon = chakra(BsExclamationDiamondFill);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex alignItems="center" fontSize={{ base: "0.95rem", md: "md" }}>
          <DangerIcon color="red.500" fontSize="xl" mr={3} /> {title}
        </Flex>
      }
      isCentered={false}
    >
      <VStack align="flex-start" spacing={4}>
        {children}
        <HStack justify="flex-end" w="100%" spacing={4}>
          <Button
            size="sm"
            variant="danger"
            isLoading={loading && networkOperationCtxt === networkOperation}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
};
