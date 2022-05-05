import { useContext } from "react";
import { Flex, Text, VStack, HStack, Avatar, chakra } from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import { AppContext } from "../../contexts";

export const Nav = () => {
  const [{ me }] = useContext(AppContext);
  const CaretDown = chakra(AiOutlineDown);
  return (
    <Flex bg="white" boxShadow="md" justify="space-between" py={5} px={10}>
      <Text></Text>
      <HStack align="center" spacing={3}>
        <Avatar src={me?.avatar} boxSize="40px" name={me?.name} />
        <VStack spacing={0} align="flex-start" ml={1}>
          <Text fontSize="sm">{me?.name}</Text>
          <Text fontSize="sm">{me?.email}</Text>
        </VStack>
        <CaretDown boxSize="14px" color="gray.600" pos="relative" top="2px" />
      </HStack>
    </Flex>
  );
};
