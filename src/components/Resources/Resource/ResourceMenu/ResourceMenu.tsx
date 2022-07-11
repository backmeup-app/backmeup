import { FC } from "react";
import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  chakra,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TResourceMenu } from "./types";

export const ResourceMenu: FC<TResourceMenu> = ({
  handleEdit,
  handleViewUrl,
  handleViewBackups,
  handleDelete,
}) => {
  const Dots = chakra(BiDotsHorizontalRounded);

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
        <MenuItem py={2} onClick={handleEdit} _hover={{ bg: "transparent" }}>
          <Text textAlign="center" w="100%">
            Edit resource
          </Text>
        </MenuItem>
        <MenuItem py={2} onClick={handleViewUrl} _hover={{ bg: "transparent" }}>
          <Text textAlign="center" w="100%">
            View URL
          </Text>
        </MenuItem>
        <MenuItem
          py={2}
          onClick={handleViewBackups}
          _hover={{ bg: "transparent" }}
        >
          <Text textAlign="center" w="100%">
            View Backups
          </Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleDelete} _hover={{ bg: "transparent" }}>
          <Text textAlign="center" color="#FF0000" w="100%">
            Delete
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
