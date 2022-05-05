import { FC } from "react";
import {
  VStack,
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
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useUpdateResource } from "../../../store";
import { TResourceComponent } from "./types";

export const Resource: FC<TResourceComponent> = ({
  name,
  uuid,
  description,
  is_active,
  edit,
}) => {
  const Dots = chakra(BiDotsHorizontalRounded);
  const updateResource = useUpdateResource();

  const handleStatusChange = async () => {
    await updateResource(uuid, { is_active: !is_active });
  };

  const handleEdit = () => {
    edit(uuid);
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
            <MenuItem _focus={{ bg: "none" }} px={3} py={1}>
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
    </VStack>
  );
};
