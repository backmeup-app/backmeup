import { FC, useEffect, useContext, useMemo } from "react";
import { useFormik } from "formik";
import { Modal, Form } from "../..";
import { TResource, TService } from "../../../store";
import { useFormConfig, useEditResourceControls } from "./controls";
import { TEditResource } from "./types";
import { AppContext } from "../../../contexts";
import { capitalize, resetFormTouched } from "../../../utilities";

export const EditResource: FC<TEditResource> = ({ isOpen, onClose, uuid }) => {
  const getControls = useEditResourceControls();
  const [{ me, loading }] = useContext(AppContext);
  const formikConfig = useFormConfig();
  const formik = useFormik(formikConfig(onClose));
  const controls = getControls(formik);

  const resource = useMemo((): TResource | undefined => {
    if (!uuid) return undefined;
    return (
      me?.services?.find(
        (service) => service._id === (me?.default_service as string)
      ) as TService
    )?.resources?.find((resource) => resource.uuid === uuid);
  }, [me?.default_service, me?.services, uuid]);

  useEffect(() => {
    if (!isOpen) {
      formik.resetForm();
      resetFormTouched(formik);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!uuid) return;
    const parsedResource = JSON.parse(JSON.stringify(resource));
    ["name", "description", "is_active", "uuid"].forEach((field) => {
      formik.setFieldValue(field, parsedResource[field]);
      formik.touched = { ...formik.touched, [field]: false };
    });
  }, [resource]);

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
          (uuid ? `Updat` : "Creat") +
          (loading ? "ing " : "e ") +
          capitalize(formik.values.name)
        }
      />
    </Modal>
  );
};
