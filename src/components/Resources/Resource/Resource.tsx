import { FC, useContext, Dispatch } from "react";
import {
  VStack,
  HStack,
  Button,
  Box,
  Flex,
  Text,
  Heading,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  chakra,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal } from "../..";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  useUpdateResource,
  useDeleteResource,
  TAppAction,
} from "../../../store";
import { TResourceComponent } from "./types";
import { AppContext, TAppState } from "../../../contexts";

export const Resource: FC<TResourceComponent> = ({
  name,
  uuid,
  description,
  is_active,
  edit,
}) => {
  const [{ loading, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Dots = chakra(BiDotsHorizontalRounded);
  const DangerIcon = chakra(BsExclamationDiamondFill);
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const handleStatusChange = async () => {
    await updateResource(uuid, { is_active: !is_active });
  };

  const handleEdit = () => {
    edit(uuid);
  };

  const handleDelete = async () => {
    await deleteResource(uuid);
  };

  const DeleteConfirmation = () => (
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
  );

  const ResourceMenu = () => {
    return (
      <Menu>
        <MenuButton as="button">
          <Dots fontSize="2xl" cursor="pointer" />
        </MenuButton>
        <MenuList
          minW="fit-content"
          borderRadius="none"
          boxShadow="md"
          fontSize="15px"
          w="135px"
        >
          <MenuItem py={2} _hover={{ bg: "transparent" }}>
            <Text onClick={handleEdit} textAlign="center" w="100%">
              Edit resource
            </Text>
          </MenuItem>
          <MenuItem py={2} _hover={{ bg: "transparent" }}>
            <Text onClick={handleEdit} textAlign="center" w="100%">
              View URL
            </Text>
          </MenuItem>
          <MenuItem py={2} _hover={{ bg: "transparent" }}>
            <Text textAlign="center" w="100%">
              View Backups
            </Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={onOpen} _hover={{ bg: "transparent" }}>
            <Text textAlign="center" color="#FF0000" w="100%">
              Delete
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <VStack
      w="100%"
      p={5}
      bg="white"
      boxShadow="md"
      align="flex-start"
      spacing={4}
    >
      <Flex justify="space-between" alignItems="center" w="100%">
        <Heading
          color="charlestonGreen"
          fontFamily="openSans"
          fontSize="sm"
          textTransform="uppercase"
        >
          {name}
        </Heading>
        <ResourceMenu />
      </Flex>
      <Flex alignItems="center" justify="space-between" w="100%">
        <Text textTransform="lowercase">
          {Boolean(description) ? description : "----"}
        </Text>
        <Switch
          colorScheme="green"
          onChange={handleStatusChange}
          isChecked={is_active}
        />
      </Flex>
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
        <DeleteConfirmation />
      </Modal>
    </VStack>
  );
};
