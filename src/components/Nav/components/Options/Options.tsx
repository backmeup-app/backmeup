import { useContext, Dispatch } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../../contexts";
import { TAppAction } from "../../../../store";

export const Options = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return (
    <Box
      pos="absolute"
      left="-6px"
      w="100%"
      top="160%"
      bg="white"
      boxShadow="sm"
    >
      <VStack
        spacing={1}
        align="flex-start"
        borderBottom="1px solid"
        borderBottomColor="rgba(0,0,0,0.06)"
        px={4}
        py={3}
      >
        <Text fontSize="14px">{me?.first_name + " " + me?.last_name}</Text>
        <Text fontSize="12.5px">{me?.email}</Text>
      </VStack>
      <Box px={4} py={3} fontSize="14px">
        Logout
      </Box>
    </Box>
  );
};
