export const handleInputChange = (
  formik: any,
  field: string,
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log(field);
  if (!formik.touched?.[field]) formik.touched[field] = true;
  formik.setFieldValue(field, event.target.value);
};

export const handleInputBlur = (formik: any, field: string) => {
  if (!formik.touched?.[field] && formik.values[field].trim().length > 0)
    formik.setFieldTouched(field, true);
};

export const resetFormTouched = (formik: any) => {
  Object.keys(formik.values).forEach((key) => {
    formik.setFieldTouched(key, false);
  });
};
