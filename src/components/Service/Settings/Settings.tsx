import { useState, useContext, useCallback, Dispatch } from "react";
import { SimpleGrid, GridItem, Stack, Box, Text } from "@chakra-ui/react";
import { General, Security, ServiceNotifications } from "..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const Settings = () => {
  const [{ browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [<General />, <Security />, <ServiceNotifications />];

  const displayTabs = useCallback(
    () =>
      ["General", "Security", "Notifications"].map((tab, index) => {
        const isActive = activeTab === index;
        return (
          <Text
            key={index}
            cursor="pointer"
            onClick={() => {
              setActiveTab(index);
            }}
            color="charlestonGreen"
            opacity={isActive ? 1 : 0.75}
            fontWeight={isActive ? "bold" : "normal"}
            borderBottom="3px solid"
            borderBottomColor={isActive ? "navajoWhite" : "transparent"}
            py={2}
            width="fit-content"
            transition="all 0.3s ease-in"
          >
            {tab}
          </Text>
        );
      }),
    [activeTab]
  );

  const displayContent = useCallback(() => tabs[activeTab], [activeTab]);

  return (
    <SimpleGrid columns={12}>
      <GridItem colSpan={{ base: 12, md: 2 }}>
        <Stack
          direction={{ base: "row", md: "column" }}
          spacing={5}
          py={2}
          pl={{ base: 0, lg: 5 }}
          align="flex-start"
          justify={{ base: "center", md: "flex-start" }}
          mb={{ base: 8, md: 0 }}
        >
          {displayTabs()}
        </Stack>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 10 }} pl={{ base: 0, lg: 10 }}>
        {displayContent()}
      </GridItem>
    </SimpleGrid>
  );
};
