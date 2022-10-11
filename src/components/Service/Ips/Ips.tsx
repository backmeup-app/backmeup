import { useContext, Dispatch, useMemo } from "react";
import { Box, Flex, Text, Image, chakra, VStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { EditIp } from "..";
import { Ip } from "./Ip";

export const Ips = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
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
    borderBottomColor: "rgba(0,0,0,0.06)",
  };

  const ZeroIps = () => (
    <VStack spacing={0} mt={6} mb={12}>
      <Image
        boxSize="220px"
        objectFit="contain"
        src="https://res.cloudinary.com/olamileke/image/upload/v1655041065/backmeup/pixeltrue-icons-seo-growth-1_air921.png"
      />
      <Box>
        <Text
          fontSize="15px"
          w={{ base: "85%", sm: "60%" }}
          textAlign="center"
          lineHeight="7"
        >
          Add an extra layer of security by making sure that only requests from
          whitelisted IP Addresses are able to backup your resources
        </Text>
      </Box>
    </VStack>
  );

  const displayIps = () =>
    (defaultService.ips ?? []).map((ip, index) => <Ip key={index} {...ip} />);

  return (
    <Box bgColor="white" w="100%" boxShadow="sm">
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
