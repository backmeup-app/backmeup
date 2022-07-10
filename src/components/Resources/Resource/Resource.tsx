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
import { capitalize } from "../../../utilities";

export const Resource: FC<TResourceComponent> = ({
  name,
  uuid,
  description,
  is_active,
  edit,
}) => {
  const [{ loading, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenUrl,
    onOpen: onOpenUrl,
    onClose: onCloseUrl,
  } = useDisclosure();
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
        <Button size="sm" variant="outline" onClick={onCloseDelete}>
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
            <Text onClick={onOpenUrl} textAlign="center" w="100%">
              View URL
            </Text>
          </MenuItem>
          <MenuItem py={2} _hover={{ bg: "transparent" }}>
            <Text textAlign="center" w="100%">
              View Backups
            </Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={onOpenDelete} _hover={{ bg: "transparent" }}>
            <Text textAlign="center" color="#FF0000" w="100%">
              Delete
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  const ResourceUrl = () => {
    return (
      <VStack spacing={5} alignItems="flex-start" w="100%">
        <Text
          bg="#f5f8fa"
          p={5}
          boxShadow="md"
          fontSize="sm"
          lineHeight="taller"
        >
          Note: Make your backup requests for {capitalize(name)} to the below
          URL. Remember that backup requests require two things. A valid API key
          for the service specified as the Authorization header and the intended
          file to be backed up for {capitalize(name)}.
        </Text>

        <Text
          p={5}
          textAlign="center"
          w="100%"
          bg="#FBFBFB"
          boxShadow="md"
          fontSize="sm"
        >
          https://duran.olamileke.me/{uuid}
        </Text>

        <Text
          w="100%"
          fontSize="sm"
          textAlign="center"
          textDecoration="underline"
        >
          Copy
        </Text>
        <Button w="100%" onClick={onCloseUrl}>
          Close
        </Button>
      </VStack>
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
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isCentered={false}
      >
        <DeleteConfirmation />
      </Modal>
      <Modal
        title={`${capitalize(name)}'s Unique Backup URL`}
        isOpen={isOpenUrl}
        onClose={onCloseUrl}
      >
        <ResourceUrl />
      </Modal>
    </VStack>
  );
};
