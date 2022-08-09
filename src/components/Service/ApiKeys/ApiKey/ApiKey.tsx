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
import { BsExclamationDiamondFill } from "react-icons/bs";
import { Modal } from "../../..";
import { TAppAction, useDeleteApiKey } from "../../../../store";
import { AppContext, TAppState } from "../../../../contexts";

export const ApiKey: FC<TApiKeyComponent> = ({
  name,
  uuid,
  value,
  last_used,
}) => {
  const [{ browserWidth, loading, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [visible, setVisible] = useState<boolean>(false);
  const VisibleIcon = chakra(AiOutlineEye);
  const InvisibleIcon = chakra(AiOutlineEyeInvisible);
  const TrashIcon = chakra(BiTrashAlt);
  const DangerIcon = chakra(BsExclamationDiamondFill);
  const deleteApiKey = useDeleteApiKey();
  const isResponsive = browserWidth && browserWidth < 769;

  const handleVisibilityChange = () => {
    setVisible(!visible);
  };

  const handleDelete = async () => {
    await deleteApiKey({ uuid });
  };

  const DeleteConfirmation = () => (
    <VStack align="flex-start" spacing={4}>
      <Box lineHeight="7" fontSize="15px">
        <Text mb={1}>
          Backup API requests that make use of {name} for authentication will
          fail to work.
        </Text>
        <Text>Are you sure you want to delete it?</Text>
      </Box>
      <HStack justify="flex-end" w="100%" spacing={4}>
        <Button
          size="sm"
          variant="danger"
          isLoading={loading && networkOperation === "delete.api.key"}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  );

  return (
    <Flex
      justify={{ md: "space-between" }}
      direction={{ base: "column", md: "row" }}
      align={{ md: "center" }}
      w="100%"
    >
      <VStack
        spacing={{ base: 2, md: 3 }}
        align="flex-start"
        w={{ base: "100%", md: "80%" }}
      >
        <Text fontWeight={600} fontSize={{ base: "md", md: "sm" }}>
          {name}
        </Text>
        <Box w="100%">
          <Text mb={{ base: 2.5, sm: 0 }}>
            {visible ? value : "********************" + value.slice(22)}
          </Text>
          <Text mt={{ md: 1 }} textAlign="left">
            {isResponsive ? "L" : "l"}ast used 23/04/2022
          </Text>
        </Box>
      </VStack>
      <HStack
        align="center"
        w={{ base: "100%", md: "20%" }}
        justify={{ md: "flex-end" }}
        mt={{ base: 2, md: 4 }}
        color="gray.800"
        spacing={{ base: 3, md: 5 }}
      >
        <Box cursor="pointer" onClick={handleVisibilityChange}>
          {visible ? (
            isResponsive ? (
              <Text fontSize="15px">Hide</Text>
            ) : (
              <InvisibleIcon fontSize="xl" cursor="pointer" />
            )
          ) : isResponsive ? (
            <Text fontSize="15px">View</Text>
          ) : (
            <VisibleIcon fontSize="xl" cursor="pointer" />
          )}
        </Box>
        {isResponsive ? (
          <Text fontSize="15px" onClick={onOpen}>
            Delete
          </Text>
        ) : (
          <TrashIcon fontSize="lg" cursor="pointer" onClick={onOpen} />
        )}
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <Flex alignItems="center">
            <DangerIcon color="red.500" fontSize="xl" mr={3} /> Delete API Key
          </Flex>
        }
        isCentered={false}
      >
        <DeleteConfirmation />
      </Modal>
    </Flex>
  );
};
