import { FC, useEffect, useContext, Dispatch, useMemo } from "react";
import { TDeleteService } from "./types";
import { Form, Modal } from "../..";
import { useFormik } from "formik";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { useFormConfig, useDeleteServiceControls } from "./controls";
import { resetFormTouched } from "../../../utilities";

export const DeleteService: FC<TDeleteService> = ({ isOpen, onClose }) => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
      resetFormTouched(formik);
    }
  }, [isOpen]);

  // useEffect(() => {
  //   formik.initialValues.default_service = defaultService?.name;
  // }, [defaultService?.name]);

  const getFormConfig = useFormConfig();
  const formik = useFormik(getFormConfig(onClose));
  const getControls = useDeleteServiceControls();
  const controls = getControls(formik);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete service`}>
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText="I understand the consequences. Delete."
        networkOperation="delete.service"
      />
    </Modal>
  );
};
