import { useEffect, FC, useContext, Dispatch } from "react";
import { Modal } from "../..";
import { useFormik } from "formik";
import { Form } from "../..";
import { useEditServiceControls, useFormConfig } from "./controls";
import { TEditService } from "./types";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const EditService: FC<TEditService> = ({ onClose, isOpen }) => {
  const [{ loading: contextLoading, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const getControls = useEditServiceControls();
  const formikConfig = useFormConfig();
  const formik = useFormik(formikConfig(onClose));
  const controls = getControls(formik);
  const isLoading = contextLoading && networkOperation === "create.service";

  useEffect(() => {
    if (!isOpen) formik.resetForm();
  }, [isOpen]);

  return (
    <Modal title="Create a new Service" isOpen={isOpen} onClose={onClose}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        networkOperation="create.service"
        submitBtnText={
          (isLoading ? "Creating" : "Create") + " " + formik.values.name
        }
      />
    </Modal>
  );
};
