import { Dispatch, useContext, useEffect } from "react";
import {
  VStack,
  Box,
  Image,
  Flex,
  Spacer,
  Container,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { HERO_IMAGE_SOURCE } from "../../utilities";
import { TAppAction, useVerifyGoogleAuth } from "../../store";
import { AppContext, TAppState } from "../../contexts";

export const Home = () => {
  const [{ loading }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const verifyGoogleAuth = useVerifyGoogleAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) verifyGoogleAuth(code);
  }, []);

  const redirectGoogleAuth = () => {
    const googleAuthUrl =
      String(process.env.REACT_APP_BACKMEUP_API) + "/accounts";
    window.location.href = googleAuthUrl;
  };

  return (
    <VStack h="100vh" w="full">
      <Box h="65%" w="full" bg="rgba(247, 219, 167, 0.5)">
        <Container
          maxW={[
            "90%",
            "container.sm",
            "container.md",
            "container.lg",
            "container.xl",
          ]}
          h="full"
        >
          <Flex h="full">
            <VStack
              w="50%"
              h="100%"
              py={10}
              direction="column"
              align="flex-start"
            >
              <Text fontFamily="oswald">BackMeUp</Text>
              <VStack
                h="calc(100% - 24px)"
                mt={5}
                justify="center"
                align="flex-start"
                spacing={10}
              >
                <Heading
                  fontFamily="openSans"
                  lineHeight="tall"
                  color="charlestonGreen"
                  fontSize="25px"
                >
                  Setup automated backups for your file, in memory database
                  stores today. Easy, fast and simple.
                </Heading>
                <Button
                  isLoading={loading}
                  onClick={redirectGoogleAuth}
                  loadingText="Login with Google"
                >
                  Login with Google
                </Button>
              </VStack>
            </VStack>
            <Spacer />
            {/* <Image
              src={HERO_IMAGE_SOURCE}
              boxSize="29rem"
              pos="relative"
              objectFit="cover"
              top="13vh"
            /> */}
          </Flex>
        </Container>
      </Box>
      <Box mt={"0px !important"} h="35%" w="full" bg="charlestonGreen" />
    </VStack>
  );
};
