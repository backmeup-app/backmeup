import { useContext, useEffect, useState } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex, Spinner, chakra } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../contexts";
import { useGetUser } from "../../store";
import { Sidebar, Message, Nav, Loader } from "../../components";
import { useRenderPages } from "./pages";
import { capitalize } from "../../utilities";
import { GiHamburgerMenu } from "react-icons/gi";

export const Admin = () => {
  const [{ me, loading: contextLoading, networkOperation }] =
    useContext(AppContext);
  const getUser = useGetUser();
  const renderPages = useRenderPages();
  const location = useLocation();
  const operations = [
    "update.resource.status",
    "delete.resource",
    "update.default.service",
    "update.notifications",
    "resend.verification.email",
  ];
  const isLoading =
    contextLoading && operations.includes(networkOperation ?? "");
  const [showSidebar, setShowSidebar] = useState(true);
  const HamburgerIcon = chakra(GiHamburgerMenu);

  useEffect(() => {
    if (!me) getUser();
  }, []);

  if (!me) {
    return <Loader />;
  }

  if (!me.default_service) return <Message />;

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <Box>
      <Helmet>
        <title>{capitalize(location.pathname)} | Backmeup</title>
      </Helmet>
      <Flex bg="white">
        <Box
          pos="fixed"
          left={{
            base: showSidebar ? 0 : "-65%",
            sm: showSidebar ? 0 : "-40%",
            lg: "0",
          }}
          w={{ base: "65%", sm: "40%", lg: "14.3%" }}
          transition="left 0.5s ease-in"
          zIndex={999}
        >
          <Sidebar />
        </Box>
        <Box
          ml={{ base: "0", lg: "14.3%" }}
          w={{ base: "100%", lg: "85.7%" }}
          bg="#FBFBFB"
          minH={"100vh"}
        >
          <Nav />
          <Box py={10} px={{ base: 8, sm: 12, lg: 16 }}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/resources" />
              </Route>
              {renderPages()}
            </Switch>
          </Box>
        </Box>
      </Flex>
      <Box
        pos="fixed"
        left={10}
        bottom={10}
        w="60px"
        h="60px"
        d={{ base: "flex", lg: "none" }}
        justifyContent="center"
        alignItems="center"
        borderRadius="full"
        bg="charlestonGreen"
        cursor="pointer"
        onClick={toggleSidebar}
      >
        <HamburgerIcon color="white" fontSize="xl" />
      </Box>
      {isLoading && (
        <Spinner size="lg" pos="fixed" right={"52px"} bottom={10} />
      )}
    </Box>
  );
};
