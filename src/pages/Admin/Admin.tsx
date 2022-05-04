import { useContext, useEffect } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import { Box, Spinner, SimpleGrid, GridItem } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { AppContext } from "../../contexts";
import { useGetUser } from "../../store";
import { Sidebar, Message } from "../../components";
import { useRenderPages } from "./pages";
import { parseTitle } from "../../utilities";

export const Admin = () => {
  const [{ me, loading }] = useContext(AppContext);
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
    <SimpleGrid columns={14} bg="white">
      <Helmet>
        <title>{parseTitle(location.pathname)}</title>
      </Helmet>
      <GridItem colSpan={2}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={10}>
        <Switch>{renderPages()}</Switch>
      </GridItem>
      {loading && <Spinner pos="fixed" right={8} bottom={8} />}
    </SimpleGrid>
  );
};
