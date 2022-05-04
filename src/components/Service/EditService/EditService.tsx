import { useState, useEffect, FC } from "react";
import { Modal } from "../..";
import { useFormik } from "formik";
import { Form, TFormControl } from "../..";
import { useEditServiceControls, useFormConfig } from "./controls";
import { TEditService } from "./types";

export const EditService: FC<TEditService> = ({ onClose, isOpen }) => {
  const getControls = useEditServiceControls();
  const formikConfig = useFormConfig();
  const formik = useFormik(formikConfig(onClose));
  const [controls, setControls] = useState<TFormControl[]>([]);

  useEffect(() => {
    if (!isOpen) formik.resetForm();
  }, [isOpen]);

  useEffect(() => {
    const controls = getControls(formik);
    setControls(controls);
  }, [formik.values, formik.errors]);

  return (
    <Modal title="Create Service" isOpen={isOpen} onClose={onClose}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText={"Create"}
      />
    </Modal>
  );
};
