import { useContext, Dispatch } from "react";
import {
  Box,
  VStack,
  Image,
  Flex,
  Text,
  chakra,
  Switch,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService, useUpdateService } from "../../../store";
import { capitalize } from "../../../utilities";
import { AiOutlinePlus } from "react-icons/ai";
import { CreateApiKey } from "..";
import { ApiKey } from "./ApiKey";

export const ApiKeys = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = ((me?.services as TService[]) ?? []).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;

  const updateService = useUpdateService();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    auth: { api_keys },
  } = defaultService;
  const isApiKeys = api_keys && api_keys.length > 0;
  const PlusIcon = chakra(AiOutlinePlus);
  const headerStyleProps = {
    py: 4,
    px: 6,
    align: "center",
    justify: "space-between",
    borderBottom: "1px solid",
    borderBottomColor: "rgba(0,0,0,0.06)",
  };

  const handleAuthChange = async () => {
    await updateService({
      name: defaultService.name,
      auth_enabled: !defaultService.auth.is_enabled,
    });
  };

  const ZeroApiKeys = () => (
    <VStack spacing={{ base: 6, sm: 8 }} my={{ base: 8, sm: 10 }}>
      <Image
        boxSize="120px"
        objectFit="contain"
        src="https://res.cloudinary.com/olamileke/image/upload/v1666403233/backmeup/assets/states/burgundy-key-3_skecfr.png"
      />
      <Text
        fontSize="15px"
        w={{ base: "85%", sm: "60%" }}
        textAlign="center"
        lineHeight="7"
      >
        No API Keys currently exist for {capitalize(defaultService.name)}. Use
        API keys to secure and authorize your backup requests for{" "}
        {capitalize(defaultService.name)}.
      </Text>
    </VStack>
  );

  const displayApiKeys = () =>
    (defaultService.auth.api_keys ?? []).map((key) => (
      <ApiKey {...key} value={key.key} />
    ));

  return (
    <Box bgColor="white" w="100%" boxShadow="sm">
      <Flex {...headerStyleProps}>
        <Box d="flex" alignItems="center">
          <Switch
            isChecked={defaultService.auth.is_enabled}
            onChange={handleAuthChange}
          />
          <Text ml={2}>Authentication</Text>
        </Box>
        <Flex align="center" cursor="pointer" onClick={onOpen}>
          <Text fontSize="sm">Add API Key</Text>
          <PlusIcon ml={2} />
        </Flex>
      </Flex>
      {isApiKeys ? (
        <VStack align="flex-start" p={6} spacing={5}>
          {displayApiKeys()}
        </VStack>
      ) : (
        <ZeroApiKeys />
      )}
      <CreateApiKey isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
