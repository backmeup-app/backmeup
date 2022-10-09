import { useContext, Dispatch } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useFormConfig, useResetPasswordControls } from "./controls";
import { Form } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const ResetPassword = () => {
  const [{ networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const getControls = useResetPasswordControls();
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const controls = getControls(formik);

  return (
    <Box w={{ base: "90%", sm: "550px" }}>
      <Box
        bg="white"
        boxShadow="0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)"
        px={{ base: 8, sm: 10 }}
        py={7}
        mb={5}
        borderRadius="4px"
      >
        <Text
          fontSize={{ base: "lg", sm: "xl" }}
          mb="5"
          fontWeight="bold"
          color="gray.700"
        >
          Reset your password
        </Text>
        <Form
          controls={controls}
          onSubmit={formik.handleSubmit}
          networkOperation="reset.user.password"
          submitBtnText={
            networkOperation === "reset.user.password"
              ? "Resetting your password"
              : "Reset"
          }
        />
      </Box>
    </Box>
  );
};
