import { FC, useContext, useMemo, Dispatch } from "react";
import { Flex, Text, VStack, Box, chakra } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  TAppAction,
  TIpAddress,
  TService,
  useDeleteIpAddress,
} from "../../../../store";
import { BiTrashAlt } from "react-icons/bi";
import { AppContext, TAppState } from "../../../../contexts";
import { capitalize } from "../../../../utilities";
import { DeleteConfirmation } from "../../..";

export const Ip: FC<TIpAddress> = ({ uuid, value }) => {
  const [{ me, browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const TrashIcon = chakra(BiTrashAlt);
  const deleteIp = useDeleteIpAddress();
  const isResponsive = browserWidth && browserWidth < 769;

  const handleDelete = async () => {
    await deleteIp({ uuid, value }, onClose);
  };

  return (
    <Flex
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      w="100%"
      align={{ md: "center" }}
    >
      <VStack alignItems="flex-start" spacing={2}>
        <Text fontSize={{ base: "md", md: "15px" }}>{value}</Text>
        <Text>{isResponsive ? "L" : "l"}ast used 25/04/2022</Text>
      </VStack>
      {isResponsive ? (
        <Text mt={2} onClick={onOpen} fontSize="15px">
          Delete
        </Text>
      ) : (
        <TrashIcon
          fontSize="lg"
          cursor="pointer"
          color="gray.800"
          onClick={onOpen}
        />
      )}
      <DeleteConfirmation
        title="Delete IP"
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
        networkOperation="delete.ip.address"
      >
        <Box lineHeight="7" fontSize="15px">
          <Text mb={2}>
            {value} will cease to be a whitelisted IP Address for{" "}
            {capitalize(defaultService.name)}.
          </Text>
          <Text>Are you sure you wish to proceed?</Text>
        </Box>
      </DeleteConfirmation>
    </Flex>
  );
};
