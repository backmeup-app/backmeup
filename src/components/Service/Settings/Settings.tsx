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
    <Box mx={{ base: 0, lg: 12 }}>
      <Tabs variant="unstyled" align="center">
        <TabList
          mb={[2, 4]}
          flexDirection={["column", "row"]}
          alignItems={["center", "unset"]}
        >
          <Tab
            _selected={{ ...selectedTabStyles }}
            width={["fit-content", "unset"]}
            mb={[2, 0]}
            fontFamily="openSans"
          >
            GENERAL
          </Tab>
          <Tab
            _selected={{ ...selectedTabStyles }}
            width={["fit-content", "unset"]}
            mb={[2, 0]}
            fontFamily="openSans"
          >
            SECURITY
          </Tab>
          <Tab
            _selected={{ ...selectedTabStyles }}
            width={["fit-content", "unset"]}
            mb={[2, 0]}
            fontFamily="openSans"
          >
            NOTIFICATIONS
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0} pt={[0, 4]}>
            <General />
          </TabPanel>
          <TabPanel px={0} pt={[0, 4]}>
            <Security />
          </TabPanel>
          <TabPanel px={0} pt={[0, 4]}>
            <ServiceNotifications />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
