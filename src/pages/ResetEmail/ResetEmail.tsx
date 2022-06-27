import { ChangeEmail } from "../../components";
import { Box } from "@chakra-ui/react";

export const ResetEmail = () => {
  return (
    <Box
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(247, 219, 167, 0.5)"
    >
      <ChangeEmail />
    </Box>
  );
};
