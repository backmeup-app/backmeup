import { FC, useState } from "react";
import { Flex, VStack, HStack, Text, Box, chakra } from "@chakra-ui/react";
import { TApiKeyComponent } from "./types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

export const ApiKey: FC<TApiKeyComponent> = ({
  name,
  uuid,
  value,
  last_used,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const VisibleIcon = chakra(AiOutlineEye);
  const InvisibleIcon = chakra(AiOutlineEyeInvisible);
  const TrashIcon = chakra(BiTrashAlt);

  const handleVisibilityChange = () => {
    setVisible(!visible);
  };

  return (
    <Flex justify="space-between" align="center" w="100%">
      <VStack spacing={3} align="flex-start" w="80%">
        <Text fontWeight={600} fontSize="sm">
          {name}
        </Text>
        <VStack spacing={1} align="flex-start">
          <Text>
            {visible ? value : "********************" + value.slice(22)}
          </Text>
          <Text textAlign="left" fontSize="sm">
            last used 23/04/2022
          </Text>
        </VStack>
      </VStack>
      <HStack align="center" w="20%" justify="flex-end" spacing={5}>
        <Box cursor="pointer" onClick={handleVisibilityChange}>
          {visible ? (
            <InvisibleIcon fontSize="xl" color="gray.800" cursor="pointer" />
          ) : (
            <VisibleIcon fontSize="xl" color="gray.800" cursor="pointer" />
          )}
        </Box>
        <TrashIcon fontSize="lg" color="gray.800" cursor="pointer" />
      </HStack>
    </Flex>
  );
};
