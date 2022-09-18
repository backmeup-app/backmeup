import { Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Form } from "../..";
import { useFormConfig, useSignupControls } from "./controls";

export const Signup = () => {
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useSignupControls();
  const controls = getControls(formik);

  return (
    <Box
      bg="white"
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
      px={12}
      py={10}
      borderRadius="4px"
      w="550px"
    >
      <Text fontSize="xl" mb="8" fontWeight="bold">
        Create your Account
      </Text>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText="Signup"
      />
    </Box>
  );
};
