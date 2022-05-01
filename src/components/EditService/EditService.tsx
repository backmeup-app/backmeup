import { useState, useEffect, FC } from "react";
import { useFormik } from "formik";
import { Form, TFormControl } from "..";
import { useEditServiceControls, useFormConfig } from "./controls";
import { TEditService } from "./types";

export const EditService: FC<TEditService> = ({ onClose }) => {
  const getControls = useEditServiceControls();
  const formikConfig = useFormConfig();
  const formik = useFormik(formikConfig(onClose));
  const [controls, setControls] = useState<TFormControl[]>([]);

  useEffect(() => {
    const controls = getControls(formik);
    setControls(controls);
  }, [formik.values, formik.errors]);

  return (
    <Form
      controls={controls}
      onSubmit={formik.handleSubmit}
      submitBtnText={"Create"}
    />
  );
};
