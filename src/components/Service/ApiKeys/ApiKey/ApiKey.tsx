import { FC, useState, useContext, Dispatch } from "react";
import {
  Flex,
  VStack,
  HStack,
  Text,
  Box,
  Button,
  chakra,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { TApiKeyComponent } from "./types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { Modal } from "../../..";
import { TAppAction, useDeleteApiKey } from "../../../../store";
import { AppContext, TAppState } from "../../../../contexts";

export const ApiKey: FC<TApiKeyComponent> = ({
  name,
  uuid,
  value,
  last_used,
}) => {
  const [{ loading, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [visible, setVisible] = useState<boolean>(false);
  const VisibleIcon = chakra(AiOutlineEye);
  const InvisibleIcon = chakra(AiOutlineEyeInvisible);
  const TrashIcon = chakra(BiTrashAlt);
  const deleteApiKey = useDeleteApiKey();

  const handleVisibilityChange = () => {
    setVisible(!visible);
  };

  const handleDelete = async () => {
    await deleteApiKey({ uuid });
  };

  const DeleteConfirmation = () => (
    <VStack align="flex-start" spacing={4}>
      <Box lineHeight="7" fontSize="15px">
        <Text mb={2}>
          Backup API requests that make use of {name} for authentication will
          fail to work.
        </Text>
        <Text>Are you sure you wish to proceed?</Text>
      </Box>
      <HStack justify="flex-end" w="100%" spacing={4}>
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="danger"
          isLoading={loading && networkOperation === "delete.api.key"}
          onClick={handleDelete}
        >
          Delete {name}
        </Button>
      </HStack>
    </VStack>
  );

  return (
    <Flex justify="space-between" align="center" w="100%">
      <VStack spacing={3} align="flex-start" w="80%">
        <Text fontWeight={600} fontSize="sm">
          {name}
        </Text>
        <VStack spacing={1} align="flex-start">
          <Text>
            {visible ? value : "********************" + value.slice(22)}
          </Text>
          <Text textAlign="left" fontSize="sm">
            last used 23/04/2022
          </Text>
        </VStack>
      </VStack>
      <HStack
        align="center"
        w="20%"
        justify="flex-end"
        color="gray.800"
        spacing={5}
      >
        <Box cursor="pointer" onClick={handleVisibilityChange}>
          {visible ? (
            <InvisibleIcon fontSize="xl" cursor="pointer" />
          ) : (
            <VisibleIcon fontSize="xl" cursor="pointer" />
          )}
        </Box>
        <TrashIcon fontSize="lg" cursor="pointer" onClick={onOpen} />
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Delete ${name}`}
        isCentered={false}
      >
        <DeleteConfirmation />
      </Modal>
    </Flex>
  );
};
