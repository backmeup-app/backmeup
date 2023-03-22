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
import { BsFolder, BsGear } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { RiShareBoxLine } from "react-icons/ri";

const tabs = [
  {
    name: "Resources",
    Icon: chakra(BsFolder),
    isActive: (pathname: string) => pathname.includes("resources"),
  },
  {
    name: "Settings",
    Icon: chakra(GoSettings),
    isActive: (pathname: string) => pathname.includes("settings"),
  },
  {
    name: "Integrations",
    Icon: chakra(RiShareBoxLine),
    isActive: (pathname: string) => pathname === "/integrations",
    hasBadge: true,
  },
  {
    name: "Account",
    Icon: chakra(BsGear),
    isActive: (pathname: string) => pathname === "/account",
  },
];

export const useDisplayTabs = () => {
  const location = useLocation();

  return (onNavigate?: () => void) => (
    <VStack spacing={14} align="flex-start" pl={5}>
      {tabs.map(({ name, Icon, isActive: isActiveFunc, hasBadge }, index) => {
        const isActive = isActiveFunc(location.pathname);
        return (
          <Flex
            key={index}
            pos="relative"
            align="center"
            color={isActive ? "navajowhite" : "#FBFBFB"}
            transition="all 0.3s ease-in"
          >
            <Icon
              fontSize="16.5px"
              mr={3}
              position="relative"
              top={hasBadge ? "1px" : "0"}
            />
            {hasBadge ? (
              <Text fontSize={hasBadge ? "0.9rem" : "0.95rem"}>{name}</Text>
            ) : (
              <ChakraLink
                as={Link}
                to={`/${name.toLowerCase()}`}
                _hover={{
                  underline: "none",
                }}
                onClick={() => {
                  onNavigate?.();
                }}
                fontSize="0.95rem"
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
