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
  const [{ me, browserWidth, loading: contextLoading, networkOperation }] =
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
  const [showSidebar, setShowSidebar] = useState(false);
  const HamburgerIcon = chakra(GiHamburgerMenu);

  useEffect(() => {
    if (!me) getUser();
  }, []);

  if (!me) {
    return <Loader />;
  }

  if (!me.default_service) return <Message />;

  const toggleSidebar = () => {
    if (browserWidth && browserWidth > 1024) return;
    setShowSidebar(!showSidebar);
  };

  return (
    <Box>
      <Helmet>
        <title>Dome | {capitalize(location.pathname)}</title>
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
          onClick={(e) => e.stopPropagation()}
          zIndex={999}
        >
          <Sidebar toggle={toggleSidebar} />
        </Box>
        <Box
          ml={{ base: "0", lg: "14.3%" }}
          w={{ base: "100%", lg: "85.7%" }}
          bg="#FBFBFB"
          minH={"100vh"}
        >
          <Nav />
          <Box py={10} px={{ base: 8, sm: 12, lg: 16 }}>
            <Route path="/">
              <Redirect to="/resources" />
            </Route>
            <Switch>{renderPages()}</Switch>
          </Box>
        </Box>
      </Flex>
      <Box
        pos="fixed"
        left={{ base: 5, sm: 7, md: 10 }}
        bottom={10}
        w="62px"
        h="62px"
        d={{ base: "flex", lg: "none" }}
        justifyContent="center"
        alignItems="center"
        borderRadius="full"
        bg="charlestonGreen"
        cursor="pointer"
        onClick={toggleSidebar}
      >
        <HamburgerIcon color="white" fontSize="lg" />
      </Box>
      {isLoading && (
        <Spinner size="lg" pos="fixed" right={"52px"} bottom={10} />
      )}
      <Box
        pos="fixed"
        display={{ lg: "none" }}
        top="0"
        left="0"
        height="100vh"
        width="100vw"
        bg={"rgba(0,0,0,0.06)"}
        opacity={showSidebar ? 1 : 0}
        zIndex={showSidebar ? 99 : -999}
        transition="opacity 0.5s ease-in"
        onClick={toggleSidebar}
      />
    </Box>
  );
};
