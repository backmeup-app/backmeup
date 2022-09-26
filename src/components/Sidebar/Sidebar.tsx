import { FC, useContext, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { AppContext } from "../../contexts";
import { Accordion } from "..";
import { TAccordion } from "../Wrappers/Accordion/types";
import { useDefaultServiceProps } from "./tabs";
import { TService } from "../../store";
import { TSidebar } from "./types";

export const Sidebar: FC<TSidebar> = ({ toggle }) => {
  const [{ me, networkOperation }] = useContext(AppContext);
  const getDefaultServiceProps = useDefaultServiceProps();
  const location = useLocation();

  const [tabs, setTabs] = useState<{
    [key in "activeService" | "account"]: TAccordion["items"] | undefined;
  }>({
    activeService: undefined,
    account: undefined,
  });

  useEffect(() => {
    const activeService = getDefaultServiceProps(
      me?.services?.find(
        ({ _id }) => _id.toString() === (me?.default_service as string)
      ) as TService,
      toggle
    );
    const account = getDefaultServiceProps(undefined, toggle);
    setTabs({ activeService, account });
  }, [
    me?.services,
    me?.default_service,
    location.pathname,
    toggle,
    networkOperation,
  ]);

  const displayTabs = useCallback(() => {
    let accordionItems: any = Object.values(tabs);
    accordionItems = [].concat.apply([], accordionItems);
    if (accordionItems.includes(undefined)) return <Box />;
    return <Accordion items={accordionItems} defaultIndex={1} />;
  }, [tabs]);

  return (
    <Box
      w="100%"
      pos="relative"
      minH="100vh"
      bg="charlestonGreen"
      color="white"
      pt="40%"
    >
      {displayTabs()}
      <Text pos="absolute" fontFamily="oswald" left={5} bottom={10}>
        DOME
      </Text>
    </Box>
  );
};
