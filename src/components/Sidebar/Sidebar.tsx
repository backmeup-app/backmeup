import { useContext, useState, useCallback } from "react";
import { Box, Button } from "@chakra-ui/react";
import { AppContext } from "../../contexts";
import { Accordion } from "..";
import { TAccordion } from "../Wrappers/Accordion/types";
import { useDefaultServiceProps, useServicesProps } from "./tabs";
import { TService } from "../../store";

export const Sidebar = () => {
  const [{ me }] = useContext(AppContext);
  const getServicesProps = useServicesProps();
  const getDefaultServiceProps = useDefaultServiceProps();
  const [tabs] = useState<{
    [key in "services" | "activeService"]: TAccordion;
  }>({
    services: getServicesProps(me?.services as TService[]),
    activeService: getDefaultServiceProps(
      me?.services?.find(
        ({ _id }) => _id.toString() === (me?.default_service as string)
      ) as TService
    ),
  });

  const displayTabs = useCallback(() => {
    return Object.values(tabs).map((tab, index) => (
      <Accordion key={index} {...tab} />
    ));
  }, [tabs]);

  return (
    <Box w="100%" minH="100vh" bg="charlestonGreen" color="white" py={10}>
      {displayTabs()}
    </Box>
  );
};
