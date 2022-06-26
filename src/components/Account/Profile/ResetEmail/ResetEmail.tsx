import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { TResetEmail } from "./types";
import { Modal, Form } from "../../../";
import { useFormConfig, useResetEmailControls } from "./controls";

export const ResetEmail: FC<TResetEmail> = ({ isOpen, onClose }) => {
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig(onClose));
  const getControls = useResetEmailControls();
  const controls = getControls(formik);

  useEffect(() => {
    if (!isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <Modal title="Change your Email Address" isOpen={isOpen} onClose={onClose}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText="Begin"
        networkOperation="user.reset.email"
      />
    </Modal>
  );
};
