import { useContext, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import { Box, Spinner, Flex } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../contexts";
import { useGetUser } from "../../store";
import { Sidebar, Message, Nav } from "../../components";
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
      <Box w="100vw" h="100vh">
        <Spinner pos="fixed" right={8} bottom={8} />
      </Box>
    );
  }

  if (!me.default_service) return <Message />;

  return (
    <Flex bg="white">
      <Helmet>
        <title>{capitalize(location.pathname)}</title>
      </Helmet>
      <Box pos="fixed" w="14.3%">
        <Sidebar />
      </Box>
      <Box ml="14.3%" w="85.7%" bg="#FBFBFB">
        <>
          <Nav />
          <Box py={10} px={16}>
            <Switch>{renderPages()}</Switch>
          </Box>
        </>
      </Box>
    </Flex>
  );
};
