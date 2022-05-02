import { useContext, useState, useCallback, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AppContext } from "../../contexts";
import { Accordion, EditService } from "..";
import { TAccordion } from "../Wrappers/Accordion/types";
import { useDefaultServiceProps, useServicesProps } from "./tabs";
import { TService } from "../../store";

export const Sidebar = () => {
  const [{ me }] = useContext(AppContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const getServicesProps = useServicesProps();
  const getDefaultServiceProps = useDefaultServiceProps();

  const [tabs, setTabs] = useState<{
    [key in "services" | "activeService" | "account"]: TAccordion | undefined;
  }>({
    services: undefined,
    activeService: undefined,
    account: getDefaultServiceProps(),
  });

  useEffect(() => {
    const services = getServicesProps(
      me?.services as TService[],
      me?.default_service as string,
      onOpen
    );
    const activeService = getDefaultServiceProps(
      me?.services?.find(
        ({ _id }) => _id.toString() === (me?.default_service as string)
      ) as TService
    );
    setTabs((tabs) => ({ ...tabs, services, activeService }));
  }, [me?.services, me?.default_service]);

  const displayTabs = useCallback(() => {
    return Object.values(tabs).map((tab, index) =>
      !tab ? (
        <Box key={index} />
      ) : (
        <Accordion key={index} {...(tab as TAccordion)} />
      )
    );
  }, [tabs]);

  return (
    <Box w="100%" minH="100vh" bg="charlestonGreen" color="white" pt="40%">
      {displayTabs()}
      <EditService isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
