import { FC, useEffect } from "react";
import { Form, Modal } from "../..";
import { useFormik } from "formik";
import { TEditIp } from "./types";
import { useEditIpControls, useFormConfig } from "./controls";

export const EditIp: FC<TEditIp> = ({ isOpen, onClose }) => {
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig(onClose));
  const getControls = useEditIpControls();
  const controls = getControls(formik);

  useEffect(() => {
    if (!isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <Modal title="Add IP Address" isOpen={isOpen} onClose={onClose}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText="Add"
        networkOperation="create.ip.address"
      />
    </Modal>
  );
};
