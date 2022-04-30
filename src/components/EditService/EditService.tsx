import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form, TFormControl } from "..";
import { useEditServiceControls, useFormConfig } from "./controls";

export const EditService = () => {
  const getControls = useEditServiceControls();
  const formikConfig = useFormConfig();
  const formik = useFormik(formikConfig());
  const [controls, setControls] = useState<TFormControl[]>([]);

  useEffect(() => {
    console.log(formik.values);
    const controls = getControls(formik);
    setControls(controls);
  }, [formik.values]);

  return (
    <Form
      controls={controls}
      onSubmit={formik.handleSubmit}
      submitBtnText={"Create Service"}
    />
  );
};
