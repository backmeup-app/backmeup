import { Box, Flex, Text, chakra, VStack } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

export const Ips = () => {
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
  );
};
