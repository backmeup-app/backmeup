import { useContext, useEffect } from "react";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../contexts";
import { useGetUser } from "../../store";
import { Sidebar, Message, Nav, VerifyEmail } from "../../components";
import { useRenderPages } from "./pages";
import { capitalize } from "../../utilities";

export const Admin = () => {
  const [{ me }] = useContext(AppContext);
  const getUser = useGetUser();
  const renderPages = useRenderPages();
  const location = useLocation();

  useEffect(() => {
    if (!me) getUser();
  }, []);

  if (!me) {
    return (
      <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (!me.default_service) return <Message />;

  return (
    <Box>
      <Helmet>
        <title>{capitalize(location.pathname)} | Backmeup</title>
      </Helmet>
      <Flex bg="white">
        <Box pos="fixed" w="14.3%">
          <Sidebar />
        </Box>
        <Box ml="14.3%" w="85.7%" bg="#FBFBFB" minH={"100vh"}>
          <Nav />
          <Box py={10} px={16}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/resources" />
              </Route>
              {renderPages()}
            </Switch>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
