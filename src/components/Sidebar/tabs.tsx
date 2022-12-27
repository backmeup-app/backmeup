import { useLocation, Link } from "react-router-dom";
import {
  chakra,
  Link as ChakraLink,
  Flex,
  Text,
  VStack,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { BsFolder } from "react-icons/bs";
import { FiTool, FiUser } from "react-icons/fi";
import { GoSettings } from "react-icons/go";

const tabs = [
  {
    name: "Resources",
    Icon: chakra(BsFolder),
    isActive: (pathname: string) => pathname.includes("resources"),
  },
  {
    name: "Settings",
    Icon: chakra(GoSettings),
    isActive: (pathname: string) => pathname === "/settings",
  },
  {
    name: "Integrations",
    Icon: chakra(FiTool),
    isActive: (pathname: string) => pathname === "/integrations",
    hasBadge: true,
  },
  {
    name: "Account",
    Icon: chakra(FiUser),
    isActive: (pathname: string) => pathname === "/account",
  },
];

export const useDisplayTabs = () => {
  const location = useLocation();

  return () => (
    <VStack spacing={12} align="flex-start" pl={5}>
      {tabs.map(({ name, Icon, isActive: isActiveFunc, hasBadge }, index) => {
        const isActive = isActiveFunc(location.pathname);
        return (
          <Flex
            key={index}
            pos="relative"
            align="center"
            color={isActive ? "navajowhite" : "#FBFBFB"}
            fontSize="15.5px"
            transition="all 0.3s ease-in"
          >
            <Icon fontSize="16.5px" mr={3} />
            {hasBadge ? (
              <Text>{name}</Text>
            ) : (
              <ChakraLink
                as={Link}
                to={`/${name.toLowerCase()}`}
                _hover={{
                  underline: "none",
                }}
              >
                {name}
              </ChakraLink>
            )}
            {hasBadge && (
              <Badge
                pos="relative"
                top="2px"
                ml={2}
                fontSize="0.6em"
                colorScheme="yellow"
              >
                SOON
              </Badge>
            )}
          </Flex>
        );
      })}
    </VStack>
  );
};
