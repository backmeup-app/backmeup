import { FC, useEffect, useContext, Dispatch } from "react";
import { Form, Modal } from "../..";
import { TCreateApiKey } from "./types";
import { useFormik } from "formik";
import { useFormConfig, useCreateApiKeyControls } from "./controls";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const CreateApiKey: FC<TCreateApiKey> = ({ isOpen, onClose }) => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig());
  const getControls = useCreateApiKeyControls();
  const controls = getControls(formik);

  useEffect(() => {
    if (isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <Modal title="Add API Key" isOpen={isOpen} onClose={onClose}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText={"Add " + formik.values.name}
        networkOperation="create.api.key"
      />
    </Modal>
  );
};
