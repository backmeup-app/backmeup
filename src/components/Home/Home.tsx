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

export const Home = () => {
  const redirectGoogleAuth = () => {
    const googleAuthUrl =
      String(process.env.REACT_APP_BACKMEUP_API) + "/accounts";
    window.location.href = googleAuthUrl;
  };

  return (
    <VStack h="100vh" w="full">
      <Box h="65%" w="full" bg="navajoWhite">
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
                <Heading lineHeight="short" color="charlestonGreen">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  vestibulum ex nec facilisis porta.{" "}
                </Heading>
                <Button
                  onClick={redirectGoogleAuth}
                  loadingText="Login with Google"
                >
                  Login with Google
                </Button>
              </VStack>
            </VStack>
            <Spacer />
            <Image
              src={HERO_IMAGE_SOURCE}
              boxSize="29rem"
              pos="relative"
              objectFit="cover"
              top="13vh"
            />
          </Flex>
        </Container>
      </Box>
      <Box mt={"0px !important"} h="35%" w="full" bg="charlestonGreen" />
    </VStack>
  );
};
