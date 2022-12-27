import { useCallback } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import {
  SimpleGrid,
  GridItem,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { General, Security, ServiceNotifications } from "..";

export const Settings = () => {
  const location = useLocation();

  const displayTabs = useCallback(
    () =>
      ["General", "Security", "Notifications"].map((tab, index) => {
        const url = `/settings/${tab.toLowerCase()}`;
        const isActive =
          location.pathname === "/settings"
            ? tab.toLowerCase() === "general"
            : location.pathname === url;

        return (
          <ChakraLink
            key={index}
            as={Link}
            to={url}
            cursor="pointer"
            color="charlestonGreen"
            opacity={isActive ? 1 : 0.8}
            fontWeight={isActive ? 500 : "normal"}
            borderBottom="3px solid"
            borderBottomColor={isActive ? "navajoWhite" : "transparent"}
            py={2}
            width="fit-content"
            transition="all 0.3s ease-in"
            _hover={{ textDecoration: "none" }}
          >
            {tab}
          </ChakraLink>
        );
      }),
    [location.pathname]
  );

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
        <Switch>
          <Route path="/settings/security" exact>
            <Security />
          </Route>
          <Route path="/settings/notifications" exact>
            <ServiceNotifications />
          </Route>
          <Route path="/settings">
            <General />
          </Route>
        </Switch>
      </GridItem>
    </SimpleGrid>
  );
};
