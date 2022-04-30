import { FormLabel } from "@chakra-ui/react";
import { TFormControl } from "../Form";

export const useFormConfig = () => {
  return () => ({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values: { name: string; description?: string }) => [],
  });
};

export const useEditServiceControls = () => {
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        label: <FormLabel>Name</FormLabel>,
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        onChange: formik.handleChange,
        value: formik.values?.name,
      },
    },
    {
      type: "textarea",
      properties: {
        name: "description",
        label: <FormLabel>Description</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
        onChange: formik.handleChange,
        value: formik.values?.description,
      },
    },
  ];
};
