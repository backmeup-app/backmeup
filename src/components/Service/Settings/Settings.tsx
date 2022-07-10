import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { General, Security, ServiceNotifications } from "..";

export const Settings = () => {
  const selectedTabStyles = {
    color: "charlestonGreen",
    borderBottomWidth: "3px",
    borderBottomStyle: "solid",
    borderBottomColor: "navajoWhite",
  };
  return (
    <Box>
      <Tabs variant="unstyled" align="center">
        <TabList mb={4}>
          <Tab _selected={{ ...selectedTabStyles }} fontFamily="oswald">
            GENERAL
          </Tab>
          <Tab _selected={{ ...selectedTabStyles }} fontFamily="oswald">
            SECURITY
          </Tab>
          <Tab _selected={{ ...selectedTabStyles }} fontFamily="oswald">
            NOTIFICATIONS
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <General />
          </TabPanel>
          <TabPanel px={0}>
            <Security />
          </TabPanel>
          <TabPanel px={0}>
            <ServiceNotifications />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
