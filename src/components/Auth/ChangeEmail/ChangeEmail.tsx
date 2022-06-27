import { Box } from "@chakra-ui/react";
import { Form } from "../..";
import { useFormik } from "formik";
import { useFormConfig, useChangeEmailControls } from "./controls";

export const ChangeEmail = () => {
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useChangeEmailControls();
  const controls = getControls(formik);

  return (
    <Box w="450px" bg="white" boxShadow="md" pos="relative" top="-10vh" p={6}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        networkOperation={"user.change.email"}
        submitBtnText="Continue"
      />
    </Box>
  );
};
