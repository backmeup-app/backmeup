import { FC } from "react";
import { VStack, Flex, Text, Heading, Switch, chakra } from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TResource } from "../../../store";

export const Resource: FC<TResource> = ({ name, description, is_active }) => {
  const Dots = chakra(BiDotsHorizontalRounded);
  return (
    <VStack
      w="100%"
      p={5}
      bg="white"
      boxShadow="md"
      align="flex-start"
      spacing={4}
    >
      <Flex justify="space-between" alignItems="center" w="100%">
        <Heading
          color="charlestonGreen"
          fontFamily="openSans"
          fontSize="sm"
          textTransform="uppercase"
        >
          {name}
        </Heading>
        <Dots fontSize="2xl" cursor="pointer" />
      </Flex>
      <Flex alignItems="center" justify="space-between" w="100%">
        <Text>{description}</Text>
        <Switch colorScheme="green" checked={is_active} />
      </Flex>
    </VStack>
  );
};
