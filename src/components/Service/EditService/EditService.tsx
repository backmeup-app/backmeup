import { useEffect, FC } from "react";
import { Modal } from "../..";
import { useFormik } from "formik";
import { Form } from "../..";
import { useEditServiceControls, useFormConfig } from "./controls";
import { TEditService } from "./types";

export const EditService: FC<TEditService> = ({ onClose, isOpen }) => {
  const getControls = useEditServiceControls();
  const formikConfig = useFormConfig();
  const formik = useFormik(formikConfig(onClose));
  const controls = getControls(formik);

  useEffect(() => {
    if (!isOpen) formik.resetForm();
  }, [isOpen]);

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
