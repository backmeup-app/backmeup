import { FC, useEffect, useContext, Dispatch } from "react";
import { Form, Modal } from "../..";
import { useFormik } from "formik";
import { TEditIp } from "./types";
import { useEditIpControls, useFormConfig } from "./controls";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const EditIp: FC<TEditIp> = ({ isOpen, onClose }) => {
  const [{ networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
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
        submitBtnText={
          (networkOperation === "create.ip.address" ? "Adding " : "Add ") +
          formik.values.address
        }
        networkOperation="create.ip.address"
      />
    </Modal>
  );
};
