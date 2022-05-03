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
import { SuccessIcon } from "..";
import { useUpdateUser } from "../../store";

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
    name: "Authorization",
    isActive: (pathname: string) => pathname === "/authorization",
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

const isTabParentActive = (pathname: string, isService?: boolean) => {
  const results = (isService ? manageServiceTabs : manageUserTabs).map(
    ({ isActive }) => isActive(pathname)
  );
  return results.includes(true);
};

export const useServicesProps = () => {
  const updateUser = useUpdateUser();

  const changeService = async (uuid: string) => {
    await updateUser({ default_service: uuid });
  };

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
          {services.map(({ _id, uuid, name }, index) => {
            const isDefaultService = _id === defaultService;
            return (
              <ListItem
                key={index}
                px={5}
                py={3}
                mb={2}
                fontSize={"0.92rem"}
                textTransform="capitalize"
                cursor="pointer"
                d="flex"
                alignItems="center"
                onClick={() => {
                  !isDefaultService && changeService(uuid);
                }}
              >
                {name}
                {isDefaultService && (
                  <SuccessIcon
                    ml={3}
                    pos="relative"
                    top="0.5px"
                    fontSize="lg"
                    color="green.500"
                  />
                )}
              </ListItem>
            );
          })}
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
    return [{ heading, content }];
  };
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
                  to={`/${name.toLowerCase()}`}
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
