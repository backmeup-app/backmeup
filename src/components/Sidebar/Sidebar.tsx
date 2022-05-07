import { useContext, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AppContext } from "../../contexts";
import { Accordion, EditService } from "..";
import { TAccordion } from "../Wrappers/Accordion/types";
import { useDefaultServiceProps, useServicesProps } from "./tabs";
import { TService } from "../../store";

export const Sidebar = () => {
  const [{ me, networkOperation }] = useContext(AppContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const getServicesProps = useServicesProps();
  const getDefaultServiceProps = useDefaultServiceProps();
  const location = useLocation();

  const [tabs, setTabs] = useState<{
    [key in "services" | "activeService" | "account"]:
      | TAccordion["items"]
      | undefined;
  }>({
    services: undefined,
    activeService: undefined,
    account: undefined,
  });

  useEffect(() => {
    const services = getServicesProps(
      me?.services as TService[],
      me?.default_service as string,
      onOpen,
      networkOperation as string
    );
    const activeService = getDefaultServiceProps(
      me?.services?.find(
        ({ _id }) => _id.toString() === (me?.default_service as string)
      ) as TService
    );
    const account = getDefaultServiceProps();
    setTabs({ services, activeService, account });
  }, [me?.services, me?.default_service, location.pathname, networkOperation]);

  const displayTabs = useCallback(() => {
    let accordionItems: any = Object.values(tabs);
    accordionItems = [].concat.apply([], accordionItems);
    if (accordionItems.includes(undefined)) return <Box />;
    return <Accordion items={accordionItems} defaultIndex={1} />;
  }, [tabs]);

  return (
    <Box w="100%" minH="100vh" bg="charlestonGreen" color="white" pt="40%">
      {displayTabs()}
      <EditService isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
