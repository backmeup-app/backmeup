import { FC } from "react";
import { useFormik } from "formik";
import { useGoogleConfig, useGoogleControls } from "./controls";
import { Form } from "../../..";
import { TGoogle } from "./types";

export const Google: FC<TGoogle> = ({ isOpen, onClose }) => {
  const getGoogleConfig = useGoogleConfig();
  const formik = useFormik(getGoogleConfig());
  const getGoogleControls = useGoogleControls();
  const controls = getGoogleControls(formik);

  return (
    <Form
      controls={controls}
      onSubmit={formik.handleSubmit}
      submitBtnText="Continue to Google"
      networkOperation="initiate.change.auth.google"
    />
  );
};
