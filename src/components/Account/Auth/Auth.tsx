import { useContext, Dispatch } from "react";
import { VStack, HStack, Box, Text } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

const AuthSelector = () => (
  <Box border="1px solid" px={4} py={3}>
    Change
  </Box>
);

export const Auth = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return (
    <VStack w="100%">
      <HStack
        bg="white"
        w="100%"
        p={{ base: 6, sm: 8, md: 10 }}
        boxShadow="sm"
        alignItems="center"
        justify="space-between"
      >
        <Text fontWeight="bold">Sign-in method</Text>
        <Box
          w="70%"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>Email and Password</Text>
          <AuthSelector />
        </Box>
      </HStack>
    </VStack>
  );
};
