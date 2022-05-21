import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { General } from "../General";

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
          <TabPanel>
            <General />
          </TabPanel>
          <TabPanel>Notifications</TabPanel>
          <TabPanel>Security</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
