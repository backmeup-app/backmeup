import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { Form } from "../../..";
import { useEmailPasswordConfig, useEmailPasswordControls } from "./controls";
import { TEmailPassword } from "./types";
import { resetFormTouched } from "../../../../utilities";

export const EmailPassword: FC<TEmailPassword> = ({ isOpen, onClose }) => {
  const getEmailPasswordConfig = useEmailPasswordConfig();
  const getEmailPasswordControls = useEmailPasswordControls();
  const formik = useFormik(getEmailPasswordConfig(onClose));
  const controls = getEmailPasswordControls(formik);

  useEffect(() => {
    if (!isOpen) resetFormTouched(formik);
  }, [isOpen]);

  return (
    <Form
      controls={controls}
      onSubmit={formik.handleSubmit}
      submitBtnText="Update"
      networkOperation="initiate.change.auth.email"
    />
  );
};
