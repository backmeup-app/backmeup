import { useContext, Dispatch, useEffect, useMemo, useCallback } from "react";
import { SimpleGrid, GridItem, Skeleton } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext, TAppState } from "../../contexts";
import {
  TAppAction,
  TService,
  useGetBackups,
  useGetResource,
} from "../../store";
import { Backup } from "./Backup";

export const Backups = () => {
  const [{ me, onScroll }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const history = useHistory();
  const { resource_uuid } = useParams<{ resource_uuid: string }>();
  const service = me?.services?.find(
    (service) => service?._id?.toString() === me?.default_service
  ) as TService;
  const resource = service?.resources?.find(
    (resource) => resource?.uuid === resource_uuid
  );
  const initialServiceId = useMemo(() => me?.default_service, []);
  const getResource = useGetResource();
  const getBackups = useGetBackups();

  useEffect(() => {
    if (!onScroll) dispatch({ type: "SET_ON_SCROLL", payload: getBackups });

    if (initialServiceId !== service._id.toString()) history.push("/resources");
  }, [service._id]);

  useEffect(() => {
    if (!resource && initialServiceId === service._id.toString()) {
      getResource();
      return;
    }

    !resource?.backups && getBackups();
  }, [resource]);

  const displaySkeletons = () =>
    new Array(6).fill("").map((value, index) => (
      <GridItem key={index} colSpan={{ base: 12, md: 6 }}>
        <Skeleton startColor="#f6f8fa" endColor="#d0d7de" height="105px" />
        {value}
      </GridItem>
    ));

  const displayBackups = useCallback(
    () =>
      resource?.backups?.map((backup, index) => (
        <Backup
          key={index}
          {...backup}
          resource_name={resource.name as string}
        />
      )),
    [resource?.backups]
  );

  return (
    <SimpleGrid columns={12} mx={{ base: 0, lg: 5 }} spacing={5}>
      {!resource?.backups ? displaySkeletons() : displayBackups()}
    </SimpleGrid>
  );
};
