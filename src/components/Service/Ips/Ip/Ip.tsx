import { FC, useContext, useMemo, Dispatch } from "react";
import {
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  Box,
  chakra,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  TAppAction,
  TIpAddress,
  TService,
  useDeleteIpAddress,
} from "../../../../store";
import { BiTrashAlt } from "react-icons/bi";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { Modal } from "../../..";
import { AppContext, TAppState } from "../../../../contexts";
import { capitalize } from "../../../../utilities";

export const Ip: FC<TIpAddress> = ({ uuid, value }) => {
  const [{ me, browserWidth, loading, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const TrashIcon = chakra(BiTrashAlt);
  const DangerIcon = chakra(BsExclamationDiamondFill);
  const deleteIp = useDeleteIpAddress();
  const isResponsive = browserWidth && browserWidth < 769;

  const DeleteConfirmation = () => (
    <VStack align="flex-start" spacing={4}>
      <Box lineHeight="7" fontSize="15px">
        <Text mb={2}>
          {value} will cease to be a whitelisted IP Address for{" "}
          {capitalize(defaultService.name)}.
        </Text>
        <Text>Are you sure you wish to proceed?</Text>
      </Box>
      <HStack justify="flex-end" w="100%" spacing={4}>
        <Button
          size="sm"
          variant="danger"
          isLoading={loading && networkOperation === "delete.ip.address"}
          onClick={() => {
            deleteIp({ uuid, value });
          }}
        >
          Delete
        </Button>
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  );

  return (
    <Flex
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      w="100%"
      align={{ md: "center" }}
    >
      <VStack alignItems="flex-start" spacing={2}>
        <Text fontSize={{ base: "md", md: "15px" }} fontWeight={600}>
          {value}
        </Text>
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
      <Modal
        title={
          <Flex alignItems="center">
            <DangerIcon color="red.500" fontSize="xl" mr={3} /> Delete IP
          </Flex>
        }
        isOpen={isOpen}
        onClose={onClose}
        isCentered={false}
      >
        <DeleteConfirmation />
      </Modal>
    </Flex>
  );
};
