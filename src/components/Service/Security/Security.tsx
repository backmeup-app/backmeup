import { VStack, Box, Flex, Text, chakra } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { CreateApiKey } from "../CreateApiKey";

export const Security = () => {
  const {
    isOpen: isOpenKey,
    onOpen: onOpenKey,
    onClose: onCloseKey,
  } = useDisclosure();
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

  return (
    <VStack spacing="24px" mx={10}>
      <Box bgColor="white" w="100%" boxShadow="md">
        <Flex {...headerStyleProps}>
          <Text>API keys</Text>
          <Flex align="center" cursor="pointer" onClick={onOpenKey}>
            <Text fontSize="sm">Add API Key</Text>
            <PlusIcon ml={2} />
          </Flex>
        </Flex>
        <VStack></VStack>
      </Box>
      <Box bgColor="white" w="100%" boxShadow="md">
        <Flex {...headerStyleProps}>
          <Text>IP Whitelist</Text>
          <Flex align="center" cursor="pointer">
            <Text fontSize="sm">Add to whitelist</Text>
            <PlusIcon ml={2} />
          </Flex>
        </Flex>
        <VStack></VStack>
      </Box>
      <CreateApiKey isOpen={isOpenKey} onClose={onCloseKey} />
    </VStack>
  );
};
