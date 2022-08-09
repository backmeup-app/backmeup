import { useContext, Dispatch } from "react";
import { Box, Text } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction, useSendVerificationEmail } from "../../store";

export const VerifyEmail = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const sendVerificationEmail = useSendVerificationEmail();

  return (
    <Box
      py={{ base: 4, lg: 5 }}
      px={{ base: 5, lg: 0 }}
      mx={{ lg: 5 }}
      mb={6}
      boxSizing="border-box"
      bg="rgba(247, 219, 167, 0.7)"
      textAlign="center"
    >
      <Text textAlign="center" fontSize="md" color="gray.800">
        {me?.email} is not verified. Didn't receive verification email ?
        <Text onClick={sendVerificationEmail} as="u" cursor="pointer" ml={1}>
          resend
        </Text>
      </Text>
    </Box>
  );
};
