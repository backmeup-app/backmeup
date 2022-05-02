import {
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

export const useServicesProps = () => {
  return (services: TService[]) => {
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
              {...activeTabProps}
              textTransform="capitalize"
            >
              {service.name}
            </ListItem>
          ))}
        </List>
      </AccordionPanel>
    );
    return { items: [{ heading, content }] };
  };
};

export const useDefaultServiceProps = () => {
  return (service: TService) => {
    const heading = (
      <AccordionButton px={5} py={3}>
        <Flex justify="space-between" align="center" w="100%">
          <Text fontFamily="oswald" fontSize="md" textTransform="uppercase">
            {service.name}
          </Text>
          <AccordionIcon />
        </Flex>
      </AccordionButton>
    );
    const content = (
      <AccordionPanel>
        <VStack spacing={3} align="flex-start">
          {manageServiceTabs.map(({ name }, index) => {
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
          })}
        </VStack>
      </AccordionPanel>
    );
    return { items: [{ heading, content }] };
  };
};
