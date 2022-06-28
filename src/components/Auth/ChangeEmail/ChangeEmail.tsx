import { useEffect, useContext, Dispatch } from "react";
import { Box } from "@chakra-ui/react";
import { Form } from "../..";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { useFormConfig, useChangeEmailControls } from "./controls";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const ChangeEmail = () => {
  const [{ networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useChangeEmailControls();
  const controls = getControls(formik);

  useEffect(() => {
    //
  }, [networkOperation]);

  return (
    <Box
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(247, 219, 167, 0.5)"
    >
      <Box w="450px" bg="white" boxShadow="md" pos="relative" top="-10vh" p={6}>
        <Helmet>
          <title>Change Your Email Address | Backmeup</title>
        </Helmet>
        <Form
          controls={controls}
          onSubmit={formik.handleSubmit}
          networkOperation={"user.change.email.initial"}
          submitBtnText="Continue"
        />
      </Box>
    </Box>
  );
};
