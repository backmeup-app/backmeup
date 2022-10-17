import { useLocation, Link } from "react-router-dom";
import { chakra, Link as ChakraLink, Flex, VStack } from "@chakra-ui/react";
import { BsFolder } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { ImInfinite } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";

const tabs = [
  {
    name: "Resources",
    Icon: chakra(BsFolder),
    isActive: (pathname: string) => pathname === "/resources",
  },
  {
    name: "Settings",
    Icon: chakra(GoSettings),
    isActive: (pathname: string) => pathname === "/settings",
  },
  {
    name: "Integrations",
    Icon: chakra(ImInfinite),
    isActive: (pathname: string) => pathname === "/integrations",
  },
  {
    name: "Account",
    Icon: chakra(VscAccount),
    isActive: (pathname: string) => pathname === "/account",
  },
];

export const useDisplayTabs = () => {
  const location = useLocation();

  return () => (
    <VStack spacing={12} align="flex-start" pl={5}>
      {tabs.map(({ name, Icon, isActive: isActiveFunc }, index) => {
        const isActive = isActiveFunc(location.pathname);
        return (
          <Flex
            key={index}
            align="center"
            color={isActive ? "navajowhite" : "#FBFBFB"}
            fontSize="15.5px"
            transition="all 0.3s ease-in"
          >
            <Icon fontSize="16.5px" mr={3} />
            <ChakraLink
              as={Link}
              to={name.toLowerCase()}
              _hover={{
                underline: "none",
              }}
            >
              {name}
            </ChakraLink>
          </Flex>
        );
      })}
    </VStack>
  );
};
