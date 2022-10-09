import { FC, useEffect, useContext, Dispatch } from "react";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useFormConfig, useLoginControls } from "./controls";
import { Form } from "../..";
import { TLogin } from ".";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const Login: FC<TLogin> = ({ handleGoogleSignin }) => {
  const [{ networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const getFormConfig = useFormConfig();
  const getLoginControls = useLoginControls();
  const formik = useFormik(getFormConfig());
  const controls = getLoginControls(formik);

  useEffect(() => {
    formik.resetForm();
  }, []);

  return (
    <Box w={{ base: "90%", sm: "550px" }}>
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
          mb="7"
          fontWeight="bold"
          color="gray.700"
        >
          Sign in to your account
        </Text>
        <Form
          controls={controls}
          onSubmit={formik.handleSubmit}
          networkOperation={networkOperation}
          submitBtnText={
            networkOperation === "user.login" ? "Logging you in" : "Login"
          }
        />
        <Text
          mt={6}
          fontSize="15.5px"
          textAlign="center"
          cursor="pointer"
          onClick={handleGoogleSignin}
        >
          Login with Google
        </Text>
      </Box>
      <Text fontSize="15.5px" color="gray.700" ml={1}>
        Don't have an account?{" "}
        <ChakraLink
          as={Link}
          to="/accounts/new"
          _hover={{ textDecoration: "none" }}
        >
          <Text as="span" color="black" fontWeight="500">
            Sign up
          </Text>
        </ChakraLink>
      </Text>
    </Box>
  );
};
