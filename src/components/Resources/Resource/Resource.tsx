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
  MenuGroup,
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
      <Box lineHeight="7" fontSize="15px">
        <Text mb={2}></Text>
        <Text>Are you sure you want to delete {name}?</Text>
      </Box>
      <HStack justify="flex-end" w="100%" spacing={4}>
        <Button
          size="sm"
          variant="danger"
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
        <Menu>
          <MenuButton as="button">
            <Dots fontSize="2xl" cursor="pointer" />
          </MenuButton>
          <MenuList minW="fit-content" p={0}>
            <MenuGroup p={0}>
              <MenuItem
                onClick={handleEdit}
                _focus={{ bg: "none" }}
                px={3}
                py={2}
              >
                <Text fontSize="sm">Edit</Text>
              </MenuItem>
              <MenuItem _focus={{ bg: "none" }} px={3} py={2}>
                <Text fontSize="sm">View Backups</Text>
              </MenuItem>
            </MenuGroup>
            <MenuDivider m={0} />
            <MenuItem
              onClick={handleDelete}
              _focus={{ bg: "none" }}
              px={3}
              py={1}
            >
              <Text fontSize="sm" color="#FF0000">
                Delete
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex alignItems="center" justify="space-between" w="100%">
        <Text textTransform="lowercase">
          {Boolean(description) ? description : "No description provided"}
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
      >
        <DeleteConfirmation />
      </Modal>
    </VStack>
  );
};
