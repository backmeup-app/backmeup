import { useFormik } from "formik";
import { Form } from "../../..";
import { useEmailPasswordConfig, useEmailPasswordControls } from "./controls";

export const EmailPassword = () => {
  const getEmailPasswordConfig = useEmailPasswordConfig();
  const getEmailPasswordControls = useEmailPasswordControls();
  const formik = useFormik(getEmailPasswordConfig());
  const controls = getEmailPasswordControls(formik);

  return (
    <Form
      controls={controls}
      onSubmit={formik.handleSubmit}
      submitBtnText="Update"
    />
  );
};
