import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Form } from "../..";
import { useFormConfig, useSignupControls } from "./controls";

export const Signup = () => {
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useSignupControls();
  const controls = getControls(formik);

  return (
    <Box bg="white" boxShadow="md" p={16} borderRadius="0px" w="600px">
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText="Signup"
      />
    </Box>
  );
};
