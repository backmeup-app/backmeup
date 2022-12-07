import { FC, useContext, Dispatch } from "react";
import { TDeleteService } from "./types";
import { Form, Modal } from "../..";
import { useFormik } from "formik";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";
import { useFormConfig, useDeleteServiceControls } from "./controls";

export const DeleteService: FC<TDeleteService> = ({ isOpen, onClose }) => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useDeleteServiceControls();
  const controls = getControls(formik);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete service`}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText="I understand the consequences. Delete."
      />
    </Modal>
  );
};
