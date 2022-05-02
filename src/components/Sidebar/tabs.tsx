import {
  chakra,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Text,
  List,
  VStack,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TService } from "../../store";

const activeTabProps = {
  color: "navajoWhite",
  fontWeight: 600,
};

const manageServiceTabs = [
  {
    name: "Overview",
    isActive: (pathname: string) => pathname === "/overview",
  },
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
    name: "Account",
    isActive: (pathname: string) => pathname === "/account",
  },
  {
    name: "Billing",
    isActive: (pathname: string) => pathname === "/billing",
  },
];

export const useServicesProps = () => {
  return (
    services: TService[],
    defaultService: string,
    openModal: () => void
  ) => {
    const PlusIcon = chakra(AiOutlinePlus);
    const heading = (
      <AccordionButton px={5}>
        <Flex justify="space-between" align="center" w="100%">
          <Text fontFamily="oswald" fontSize="md">
            SERVICES
          </Text>
          <AccordionIcon />
        </Flex>
      </AccordionButton>
    );
    const content = (
      <AccordionPanel>
        <List>
          {services.map((service, index) => (
            <ListItem
              key={index}
              px={5}
              py={3}
              mb={2}
              fontSize={"0.92rem"}
              {...(service._id === defaultService ? activeTabProps : {})}
              textTransform="capitalize"
              cursor="pointer"
            >
              {service.name}
            </ListItem>
          ))}
          <ListItem
            px={5}
            py={3}
            cursor="pointer"
            fontSize="0.92rem"
            onClick={openModal}
          >
            <Flex align="center">
              <PlusIcon mr={2} />
              New Service
            </Flex>
          </ListItem>
        </List>
      </AccordionPanel>
    );
    return { items: [{ heading, content }] };
  };
};

export const useDefaultServiceProps = () => {
  const location = useLocation();
  return (service?: TService) => {
    const heading = (
      <AccordionButton px={5} py={3}>
        <Flex justify="space-between" align="center" w="100%">
          <Text fontFamily="oswald" fontSize="md" textTransform="uppercase">
            {service ? service.name : "Account"}
          </Text>
          <AccordionIcon />
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
                    fontWeight: 600,
                  }
                : {};
              return (
                <ChakraLink
                  as={Link}
                  key={index}
                  fontSize="0.92rem"
                  to={`/${name.toLowerCase()}`}
                  py={3}
                  px={5}
                  w={"100%"}
                  _hover={{
                    underline: "none",
                  }}
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
    return { items: [{ heading, content }] };
  };
};
