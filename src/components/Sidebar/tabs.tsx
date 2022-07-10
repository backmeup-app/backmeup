import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { TService } from "../../store";

const manageServiceTabs = [
  {
    name: "Resources",
    isActive: (pathname: string) => pathname.startsWith("/resources"),
  },
  {
    name: "Settings",
    isActive: (pathname: string) => pathname === "/settings",
  },
];

const manageUserTabs = [
  {
    name: "Profile",
    isActive: (pathname: string) => pathname === "/profile",
  },
  {
    name: "Notifications",
    isActive: (pathname: string) => pathname === "/notifications",
  },
  {
    name: "Billing",
    isActive: (pathname: string) => pathname === "/billing",
  },
];

const isTabParentActive = (pathname: string, isService?: boolean) => {
  const results = (isService ? manageServiceTabs : manageUserTabs).map(
    ({ isActive }) => isActive(pathname)
  );
  return results.includes(true);
};

export const useDefaultServiceProps = () => {
  const location = useLocation();
  return (service?: TService) => {
    const isParentActive = isTabParentActive(
      location.pathname,
      Boolean(service)
    );
    const transition = "all 0.3s ease-in";
    const color = isParentActive ? "navajowhite" : "white";
    const heading = (
      <AccordionButton px={5} py={3}>
        <Flex justify="space-between" align="center" w="100%">
          <Text
            fontFamily="oswald"
            fontSize="md"
            transition={transition}
            color={color}
            textTransform="uppercase"
          >
            {service ? service.name : "Account"}
          </Text>
          <AccordionIcon transition={transition} color={color} />
        </Flex>
      </AccordionButton>
    );
    const content = (
      <AccordionPanel>
        <VStack spacing={2} align="flex-start">
          {(service ? manageServiceTabs : manageUserTabs).map(
            ({ name, isActive }, index) => {
              const activeProps = isActive(location.pathname)
                ? {
                    color: "navajoWhite",
                  }
                : {};
              return (
                <ChakraLink
                  as={Link}
                  key={index}
                  fontSize="0.92rem"
                  to={`/${name.toLowerCase().replace(/ /g, "-")}`}
                  py={3}
                  px={5}
                  w={"100%"}
                  _hover={{
                    underline: "none",
                  }}
                  transition="all 0.3s ease-in"
                  {...activeProps}
                >
                  {name}
                </ChakraLink>
              );
            }
          )}
        </VStack>
      </AccordionPanel>
    );
    return [{ heading, content }];
  };
};
