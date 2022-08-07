import { useContext, useEffect } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../contexts";
import { useGetUser } from "../../store";
import { Sidebar, Message, Nav, Loader } from "../../components";
import { useRenderPages } from "./pages";
import { capitalize } from "../../utilities";

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

  useEffect(() => {
    if (!me) getUser();
  }, []);

  if (!me) {
    return <Loader />;
  }

  if (!me.default_service) return <Message />;

  return (
    <Box>
      <Helmet>
        <title>{capitalize(location.pathname)} | Backmeup</title>
      </Helmet>
      <Flex bg="white">
        <Box pos="fixed" display={{ base: "none", lg: "block" }} w="14.3%">
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
      {isLoading && (
        <Spinner size="lg" pos="fixed" right={"52px"} bottom={10} />
      )}
    </Box>
  );
};
