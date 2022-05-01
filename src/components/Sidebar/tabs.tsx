import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TService } from "../../store";

const manageServiceTabs = [
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
      <AccordionButton>
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
            <ListItem key={index}>{service.name}</ListItem>
          ))}
        </List>
      </AccordionPanel>
    );
    return { items: [{ heading, content }] };
  };
};

export const useDefaultServiceProps = () => {
  return (service: string) => {
    const heading = (
      <AccordionButton>
        <Flex justify="space-between" align="center" w="100%">
          <Text fontFamily="oswald" fontSize="md" textTransform="uppercase">
            {service}
          </Text>
          <AccordionIcon />
        </Flex>
      </AccordionButton>
    );
    const content = (
      <AccordionPanel>
        <List>
          {manageServiceTabs.map(({ name }, index) => (
            <Link key={index} to={`/${name.toLowerCase()}`}>
              {name}
            </Link>
          ))}
        </List>
      </AccordionPanel>
    );
    return { items: [{ heading, content }] };
  };
};
