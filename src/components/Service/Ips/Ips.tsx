import { useContext, Dispatch, useMemo } from "react";
import { Box, Flex, Text, Image, chakra, VStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { capitalize } from "../../../utilities";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { EditIp } from "..";
import { Ip } from "./Ip";

export const Ips = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return (me?.services as TService[]).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);
  const isIps = defaultService.ips && defaultService.ips.length > 0;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const PlusIcon = chakra(AiOutlinePlus);
  const headerStyleProps = {
    py: 4,
    px: 6,
    align: "center",
    justify: "space-between",
    borderBottom: "1px solid",
    borderBottomColor: "gray.100",
  };

  const ZeroIps = () => (
    <VStack spacing={8} my={10}>
      <Image
        boxSize="155px"
        objectFit="contain"
        src="https://res.cloudinary.com/olamileke/image/upload/v1653248142/backmeup/api-keys_ugv8zw.png"
      />
      <Box>
        <Text fontSize="15px" w="60%" lineHeight="tall">
          No API Keys currently exist for {capitalize(defaultService.name)}. API
          Keys are required to backup {capitalize(defaultService.name)}'s
          resources.
        </Text>
      </Box>
    </VStack>
  );

  const displayIps = () =>
    (defaultService.ips ?? []).map((ip, index) => <Ip key={index} {...ip} />);

  return (
    <Box bgColor="white" w="100%" boxShadow="md">
      <Flex {...headerStyleProps}>
        <Text>IP Whitelist</Text>
        <Flex align="center" cursor="pointer" onClick={onOpen}>
          <Text fontSize="sm">Add IP Address</Text>
          <PlusIcon ml={2} />
        </Flex>
      </Flex>
      {isIps ? (
        <VStack spacing={6} p={6}>
          {displayIps()}
        </VStack>
      ) : (
        <ZeroIps />
      )}
      <EditIp isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
