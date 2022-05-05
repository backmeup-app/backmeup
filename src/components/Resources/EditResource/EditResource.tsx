import { FC, useState, useEffect, useContext, useMemo } from "react";
import { useFormik } from "formik";
import { Modal, TFormControl, Form } from "../..";
import { TResource, TService } from "../../../store";
import { useFormConfig, useEditResourceControls } from "./controls";
import { TEditResource } from "./types";
import { AppContext } from "../../../contexts";
import { capitalize } from "../../../utilities";

export const EditResource: FC<TEditResource> = ({ isOpen, onClose, uuid }) => {
  const getControls = useEditResourceControls();
  const [{ me }] = useContext(AppContext);
  const formikConfig = useFormConfig();
  const formik = useFormik(formikConfig(onClose));
  const [controls, setControls] = useState<TFormControl[]>([]);

  const resource = useMemo((): TResource | undefined => {
    if (!uuid) return undefined;
    return (
      me?.services?.find(
        (service) => service._id === (me?.default_service as string)
      ) as TService
    )?.resources?.find((resource) => resource.uuid === uuid);
  }, [me?.default_service, me?.services, uuid]);

  useEffect(() => {
    if (!isOpen) formik.resetForm();
  }, [isOpen]);

  useEffect(() => {
    if (!uuid) return;
    const parsedResource = JSON.parse(JSON.stringify(resource));
    ["name", "description", "is_active", "uuid"].forEach((field) => {
      formik.setFieldValue(field, parsedResource[field]);
    });
  }, [resource]);

  useEffect(() => {
    const controls = getControls(formik);
    setControls(controls);
  }, [formik.values, formik.errors]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        uuid ? `Update ${capitalize(formik.values.name)}` : "Create Resource"
      }
    >
      <Form
        controls={controls}
        onSubmit={formik.handleSubmit}
        submitBtnText={
          uuid ? `Update ${capitalize(formik.values.name)}` : "Create"
        }
      />
    </Modal>
  );
};
