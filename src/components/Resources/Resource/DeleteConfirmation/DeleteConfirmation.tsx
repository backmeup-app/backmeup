import { FC, useContext, Dispatch } from "react";
import { VStack, HStack, Flex, Text, Button, chakra } from "@chakra-ui/react";
import { TDeleteConfirmation } from ".";
import { AppContext, TAppState } from "../../../../contexts";
import { TAppAction } from "../../../../store";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { Modal } from "../../..";

export const DeleteConfirmation: FC<TDeleteConfirmation> = ({
  name,
  isOpen,
  handleDelete,
  onClose,
}) => {
  const [{ loading, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const DangerIcon = chakra(BsExclamationDiamondFill);

  return (
    <Modal
      title={
        <Flex alignItems="center">
          <DangerIcon color="red.500" fontSize="xl" mr={3} /> Delete Resource
        </Flex>
      }
      isOpen={isOpen}
      onClose={onClose}
      isCentered={false}
    >
      <VStack align="flex-start" spacing={4}>
        <Text>Are you sure you want to delete {name} ?</Text>
        <HStack justify="flex-end" w="100%" spacing={4}>
          <Button
            size="sm"
            variant="danger"
            onClick={handleDelete}
            isLoading={loading && networkOperation === "delete.resource"}
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
