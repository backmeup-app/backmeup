import { useEffect, useContext, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Flex, Spinner, Text, chakra, Button } from "@chakra-ui/react";
import { TAppAction, useChangeEmailFinal } from "../../../store";
import { AppContext, TAppState } from "../../../contexts";
import { BsCheckAll } from "react-icons/bs";

export const EmailChanged = () => {
  const [{ loading }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const changeEmailFinal = useChangeEmailFinal();
  const Check = chakra(BsCheckAll);
  const history = useHistory();

  useEffect(() => {
    const changeEmail = async () => await changeEmailFinal();
    changeEmail();
  }, []);

  const handleClick = () => {
    history.push("/");
  };

  if (loading)
    return (
      <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
        <Helmet>
          <title>Email Address Changed | Backmeup</title>
        </Helmet>
        <Spinner size="lg" />
      </Flex>
    );

  return (
    <Box
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(247, 219, 167, 0.5)"
    >
      <Helmet>
        <title>Email Address Changed | Backmeup</title>
      </Helmet>
      <Flex
        direction="column"
        alignItems="center"
        w="420px"
        bg="white"
        boxShadow="sm"
        pos="relative"
        top="-10vh"
        p={6}
      >
        <Check fontSize="4xl" color="green.500" mb={5} />
        <Text textAlign="center" fontSize="15px" lineHeight="6" mb={3}>
          Your email address has been successfully changed. You will receive an
          email confirming this.
        </Text>
        <Button onClick={handleClick} w="100%" mt={4} size="sm">
          Go to Home
        </Button>
      </Flex>
    </Box>
  );
};
