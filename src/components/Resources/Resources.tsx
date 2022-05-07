import { useContext, useEffect, useCallback, useState, useMemo } from "react";
import { SimpleGrid, GridItem, Box, chakra, Skeleton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { Resource, ResourceMessage, EditResource } from ".";
import { AppContext } from "../../contexts";
import { TService, useGetResources } from "../../store";

export const Resources = () => {
  const [{ me }] = useContext(AppContext);
  const [uuid, setUuid] = useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const getResources = useGetResources();
  const PlusIcon = chakra(AiOutlinePlus);

  const defaultService: TService = useMemo(() => {
    return me?.services?.find(
      (service) => service._id.toString() === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service, me?.services]);

  useEffect(() => {
    if (!defaultService?.resources) getResources(defaultService.uuid);
  }, [defaultService]);

  const handleEdit = (uuid: string) => {
    setUuid(uuid);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setUuid(undefined);
  };

  const displayResources = useCallback(() => {
    return defaultService?.resources?.map((resource, index) => (
      <GridItem key={index} colSpan={6}>
        <Resource {...resource} edit={handleEdit} />
      </GridItem>
    ));
  }, [defaultService]);

  const displaySkeletons = () =>
    new Array(6).fill("").map((value, index) => (
      <GridItem key={index} colSpan={6}>
        <Skeleton startColor="#f6f8fa" endColor="#d0d7de" height="105px" />
        {value}
      </GridItem>
    ));

  if (defaultService?.resources?.length === 0) return <ResourceMessage />;

  return (
    <SimpleGrid columns={12} spacing={5}>
      {displayResources()}
      {!defaultService?.resources && displaySkeletons()}
      <Box
        pos="fixed"
        right={10}
        bottom={10}
        p="5"
        borderRadius="full"
        bg="charlestonGreen"
        cursor="pointer"
        onClick={onOpen}
      >
        <PlusIcon color="white" fontSize="xl" />
      </Box>
      <EditResource isOpen={isOpen} onClose={handleModalClose} uuid={uuid} />
    </SimpleGrid>
  );
};
