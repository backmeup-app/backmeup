import { useContext, Dispatch, useMemo } from "react";
import { Box, VStack, Image, Flex, Text, chakra } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { capitalize } from "../../../utilities";
import { AiOutlinePlus } from "react-icons/ai";
import { CreateApiKey } from "..";

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
  const headerStyleProps = {
    py: 5,
    px: 6,
    mb: 10,
    align: "center",
    justify: "space-between",
    borderBottom: "1px solid",
    borderBottomColor: "gray.100",
  };

  const ZeroApiKeys = () => (
    <VStack spacing={8}>
      <Image
        boxSize="155px"
        objectFit="contain"
        src="https://res.cloudinary.com/olamileke/image/upload/v1653248142/backmeup/api-keys_ugv8zw.png"
      />
      <Box>
        <Text fontSize="md" fontFamily="openSans" w="60%" lineHeight="tall">
          No API Keys currently exist for {capitalize(defaultService.name)}. API
          Keys are required to backup {capitalize(defaultService.name)}'s
          resources.
        </Text>
      </Box>
    </VStack>
  );

  return (
    <Box bgColor="white" w="100%" boxShadow="md" pb={10}>
      <Flex {...headerStyleProps}>
        <Text>API keys</Text>
        <Flex align="center" cursor="pointer" onClick={onOpen}>
          <Text fontSize="sm">Add API Key</Text>
          <PlusIcon ml={2} />
        </Flex>
      </Flex>
      {isApiKeys ? <Box>Olamileke</Box> : <ZeroApiKeys />}
      <CreateApiKey isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
