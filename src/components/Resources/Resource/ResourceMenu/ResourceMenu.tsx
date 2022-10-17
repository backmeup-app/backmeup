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
        boxShadow="sm"
        fontSize="15px"
        w="135px"
      >
        <MenuItem py={1} onClick={handleEdit} _hover={{ bg: "transparent" }}>
          <Text fontSize="14px" textAlign="center" w="100%">
            Edit Resource
          </Text>
        </MenuItem>
        <MenuItem py={1} onClick={handleViewUrl} _hover={{ bg: "transparent" }}>
          <Text fontSize="14px" textAlign="center" w="100%">
            View URL
          </Text>
        </MenuItem>
        <MenuItem
          py={1}
          onClick={handleViewBackups}
          _hover={{ bg: "transparent" }}
        >
          <Text fontSize="14px" textAlign="center" w="100%">
            View Backups
          </Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem py={0} onClick={handleDelete} _hover={{ bg: "transparent" }}>
          <Text fontSize="14px" textAlign="center" color="#FF0000" w="100%">
            Delete
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
