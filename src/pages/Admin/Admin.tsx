import { useContext, useEffect } from "react";
import { Box, Spinner, SimpleGrid, GridItem } from "@chakra-ui/react";
import { AppContext } from "../../contexts";
import { useGetUser } from "../../store";
import { ServiceMessage, Sidebar } from "../../components";

export const Admin = () => {
  const [{ me, loading }] = useContext(AppContext);
  const getUser = useGetUser();

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

  if (!me.default_service) return <ServiceMessage />;

  return (
    <SimpleGrid columns={14} bg="white">
      <GridItem colSpan={2}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={10}></GridItem>
      {loading && <Spinner pos="fixed" right={8} bottom={8} />}
    </SimpleGrid>
  );
};
