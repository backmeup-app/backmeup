import { useContext, Dispatch, useMemo } from "react";
import { Box, VStack, Image, Flex, Text, chakra } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { capitalize } from "../../../utilities";
import { AiOutlinePlus } from "react-icons/ai";
import { FiKey } from "react-icons/fi";
import { CreateApiKey } from "..";
import { ApiKey } from "./ApiKey";

export const ApiKeys = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return (me?.services as TService[]).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isApiKeys =
    defaultService.api_keys && defaultService.api_keys.length > 0;
  const PlusIcon = chakra(AiOutlinePlus);
  const KeyIcon = chakra(FiKey);
  const headerStyleProps = {
    py: 4,
    px: 6,
    align: "center",
    justify: "space-between",
    borderBottom: "1px solid",
    borderBottomColor: "gray.100",
  };

  const ZeroApiKeys = () => (
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

  const displayApiKeys = () =>
    (defaultService.api_keys ?? []).map((key, index) => (
      <ApiKey {...key} value={key.key} />
    ));

  return (
    <Box bgColor="white" w="100%" boxShadow="md">
      <Flex {...headerStyleProps}>
        <Box d="flex" alignItems="center">
          <Text mr={2}>API keys</Text>
          <KeyIcon />
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
