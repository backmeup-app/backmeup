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
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TService } from "../../store";

const activeTabProps = {
  bg: "navajoWhite",
  fontWeight: 600,
  color: "charlestonGreen",
};

const manageServiceTabs = [
  {
    name: "Overview",
    isActive: () => {},
  },
  {
    name: "Backups",
    isActive: () => {},
  },
  {
    name: "Settings",
    isActive: () => {},
  },
];

const manageUserTabs = [
  {
    name: "Profile",
    isActive: () => {},
  },
  {
    name: "Account",
    isActive: () => {},
  },
  {
    name: "Billing",
    isActive: () => {},
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
              {...(service._id !== defaultService ? activeTabProps : {})}
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
            ({ name }, index) => {
              const activeProps =
                index === 2
                  ? {
                      bg: "navajoWhite",
                      fontWeight: 600,
                      color: "charlestonGreen",
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
