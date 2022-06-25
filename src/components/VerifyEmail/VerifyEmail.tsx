import { Box, Text } from "@chakra-ui/react";

export const VerifyEmail = () => {
  return (
    <Box w="100%" py={5} bg="#FEF9FF" textAlign="center">
      <Text textAlign="center" fontSize="md">
        Your email address is not verified. Resend verification link.
      </Text>
    </Box>
  );
};
