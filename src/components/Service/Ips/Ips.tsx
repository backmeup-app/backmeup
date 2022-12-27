import { useContext, Dispatch } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  chakra,
  HStack,
  Spinner,
  VStack,
  Switch,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService, useUpdateService } from "../../../store";
import { EditIp } from "..";
import { Ip } from "./Ip";

export const Ips = () => {
  const [{ me, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = ((me?.services as TService[]) ?? []).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;
  const updateService = useUpdateService();

  const {
    ip_whitelist: { ips },
  } = defaultService;
  const isIps = ips && ips.length > 0;
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

  const handleIpWhitelistChange = async () => {
    await updateService({
      name: defaultService.name,
      ip_whitelist_enabled: !defaultService.ip_whitelist.is_enabled,
    });
  };

  const ZeroIps = () => (
    <VStack spacing={8} my={{ base: 8, sm: 10 }}>
      <Image
        boxSize={{ base: "105px", sm: "120px" }}
        objectFit="contain"
        src="https://res.cloudinary.com/olamileke/image/upload/v1672057772/dome/assets/gello/clip-ray_zte0qb.png"
      />
      <Text
        fontSize="15px"
        w={{ base: "85%", sm: "60%" }}
        textAlign="center"
        lineHeight="7"
      >
        Add an extra layer of security by making sure that only requests from
        whitelisted IP Addresses are able to backup your resources
      </Text>
    </VStack>
  );

  const displayIps = () =>
    (defaultService.ip_whitelist.ips ?? []).map((ip, index) => (
      <Ip key={index} {...ip} />
    ));

  return (
    <Box bgColor="white" w="100%" boxShadow="sm">
      <Flex {...headerStyleProps}>
        <HStack d="flex">
          <Switch
            isChecked={defaultService.ip_whitelist.is_enabled}
            onChange={handleIpWhitelistChange}
          />
          <Text>IP Whitelisting</Text>
          <Spinner
            size="sm"
            visibility={
              networkOperation === "update.service.ip" ? "visible" : "hidden"
            }
          />
        </HStack>
        <Flex align="center" cursor="not-allowed" onClick={onOpen}>
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
