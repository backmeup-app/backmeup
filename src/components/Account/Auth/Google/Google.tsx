import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { useGoogleConfig, useGoogleControls } from "./controls";
import { Form } from "../../..";
import { TGoogle } from "./types";
import { resetFormTouched } from "../../../../utilities";

export const Google: FC<TGoogle> = ({ isOpen }) => {
  const getGoogleConfig = useGoogleConfig();
  const formik = useFormik(getGoogleConfig());
  const getGoogleControls = useGoogleControls();
  const controls = getGoogleControls(formik);

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
      resetFormTouched(formik);
    }
  }, [isOpen]);

  return (
    <Form
      controls={controls}
      onSubmit={formik.handleSubmit}
      submitBtnText="Continue to Google"
      networkOperation="initiate.change.auth.google"
    />
  );
};
