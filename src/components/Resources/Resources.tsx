import { useContext, useEffect, useCallback, useState, useMemo } from "react";
import { SimpleGrid, GridItem, Box, chakra, Skeleton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { Resource, ResourceMessage, EditResource } from ".";
import { AppContext } from "../../contexts";
import { TService, useGetResources } from "../../store";

export const Resources = () => {
  const [{ me, loading: contextLoading, networkOperation }] =
    useContext(AppContext);
  const [uuid, setUuid] = useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const getResources = useGetResources();
  const PlusIcon = chakra(AiOutlinePlus);
  const operations = ["update.resource.status", "update.default.service"];
  const isLoading =
    contextLoading && operations.includes(networkOperation ?? "");

  const defaultService: TService = useMemo(() => {
    return (me?.services ?? []).find(
      (service) => service._id.toString() === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service, me?.services]);

  const hasResources = !defaultService?.resources
    ? false
    : defaultService?.resources?.length > 1
    ? true
    : !Boolean(
        defaultService?.resources?.length === 1 &&
          defaultService?.resources[0].isSingle
      );

  useEffect(() => {
    if (!hasResources) getResources();
  }, [defaultService?.uuid]);

  const handleEdit = (uuid: string) => {
    setUuid(uuid);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setUuid(undefined);
  };

  const displayResources = useCallback(() => {
    return (defaultService?.resources ?? []).map((resource, index) => (
      <GridItem key={index} colSpan={{ base: 12, md: 6 }}>
        <Resource {...resource} edit={handleEdit} />
      </GridItem>
    ));
  }, [defaultService]);

  const displaySkeletons = () =>
    new Array(6).fill("").map((value, index) => (
      <GridItem key={index} colSpan={{ base: 12, md: 6 }}>
        <Skeleton startColor="#f6f8fa" endColor="#d0d7de" height="105px" />
        {value}
      </GridItem>
    ));

  if (!defaultService || defaultService?.resources?.length === 0)
    return <ResourceMessage />;

  return (
    <SimpleGrid columns={12} mx={{ base: 0, lg: 5 }} spacing={5}>
      {hasResources ? displayResources() : displaySkeletons()}
      {hasResources && (
        <Box
          pos="fixed"
          right={{ base: 5, sm: 7, md: 10 }}
          bottom={isLoading ? 20 : 10}
          w="60px"
          h="60px"
          d="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="full"
          bg="charlestonGreen"
          cursor="pointer"
          onClick={onOpen}
          transition="bottom 0.2s ease-in"
        >
          <PlusIcon color="white" fontSize={{ base: "2xl", lg: "xl" }} />
        </Box>
      )}
      <EditResource isOpen={isOpen} onClose={handleModalClose} uuid={uuid} />
    </SimpleGrid>
  );
};
