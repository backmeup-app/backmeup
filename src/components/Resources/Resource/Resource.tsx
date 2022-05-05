import { FC } from "react";
import { VStack, Flex, Text, Heading, Switch, chakra } from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TResource, useUpdateResource } from "../../../store";

export const Resource: FC<TResource> = ({
  name,
  uuid,
  description,
  is_active,
}) => {
  const Dots = chakra(BiDotsHorizontalRounded);
  const updateResource = useUpdateResource();

  const handleStatusChange = async () => {
    await updateResource(uuid, { is_active: !is_active });
  };

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
        <Switch
          colorScheme="green"
          onChange={handleStatusChange}
          isChecked={is_active}
        />
      </Flex>
    </VStack>
  );
};
