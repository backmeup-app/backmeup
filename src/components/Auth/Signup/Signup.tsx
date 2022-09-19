import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Form } from "../..";
import { useFormConfig, useSignupControls } from "./controls";

export const Signup = () => {
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useSignupControls();
  const controls = getControls(formik);

  return (
    <Box>
      <Box
        bg="white"
        boxShadow="0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
        px={12}
        pt={9}
        pb={8}
        mb={5}
        borderRadius="4px"
        w="550px"
      >
        <Text fontSize="xl" mb="6" fontWeight="bold" color="gray.700">
          Create your Account
        </Text>
        <Form
          controls={controls}
          onSubmit={formik.handleSubmit}
          submitBtnText="Signup"
        />
        <Text mt={6} fontSize="15.5px" textAlign="center">
          Signup via Google
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
