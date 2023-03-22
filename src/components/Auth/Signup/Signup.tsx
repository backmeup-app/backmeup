import { useEffect, useContext, Dispatch } from "react";
import { Helmet } from "react-helmet";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Form } from "../..";
import { useFormConfig, useSignupControls } from "./controls";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";
import { resetFormTouched, redirectGoogleAuth } from "../../../utilities";

export const Signup = () => {
  const [{ networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useSignupControls();
  const controls = getControls(formik);

  useEffect(() => {
    resetFormTouched(formik);
  }, []);

  return (
    <Box w={{ base: "90%", sm: "550px" }}>
      <Helmet>
        <title>Dome | Signup</title>
      </Helmet>
      <Box
        bg="white"
        boxShadow="0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
        px={{ base: 8, sm: 12 }}
        pt={8}
        pb={7}
        mb={5}
        borderRadius="4px"
      >
        <Text
          fontSize={{ base: "lg", sm: "xl" }}
          mb="6"
          fontWeight="bold"
          color="gray.700"
        >
          Create your Account
        </Text>
        <Form
          controls={controls}
          onSubmit={formik.handleSubmit}
          networkOperation="user.signup"
          submitBtnText={
            networkOperation === "user.signup" ? "Signing you up" : "Signup"
          }
        />
        <Text
          mt={6}
          fontSize="15.5px"
          textAlign="center"
          cursor="pointer"
          onClick={() => {
            redirectGoogleAuth();
          }}
        >
          Signup with Google
        </Text>
      </Box>
      <Text fontSize="15.5px" color="gray.700" ml={1}>
        Have an account?{" "}
        <ChakraLink
          as={Link}
          to="/session/new"
          _hover={{ textDecoration: "none" }}
        >
          <Text as="span" color="black" fontWeight="500">
            Sign in
          </Text>
        </ChakraLink>
      </Text>
    </Box>
  );
};
