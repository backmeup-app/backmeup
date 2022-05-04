import { useContext, useEffect, useCallback, useMemo } from "react";
import { SimpleGrid, GridItem } from "@chakra-ui/react";
import { Resource, ResourceMessage } from ".";
import { AppContext } from "../../contexts";
import { TService, useGetResources } from "../../store";

export const Resources = () => {
  const [{ me }] = useContext(AppContext);
  const getResources = useGetResources();

  const defaultService: TService = useMemo(() => {
    return me?.services?.find(
      (service) => service._id.toString() === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service, me?.services]);

  useEffect(() => {
    if (!defaultService?.resources) getResources(defaultService.uuid);
  }, [defaultService]);

  const displayResources = useCallback(() => {
    return defaultService?.resources?.map((resource, index) => (
      <GridItem key={index} colSpan={6}>
        <Resource {...resource} />
      </GridItem>
    ));
  }, [defaultService]);

  if (defaultService?.resources?.length === 0) return <ResourceMessage />;

  return (
    <SimpleGrid columns={12} spacing={5}>
      {displayResources()}
    </SimpleGrid>
  );
};
