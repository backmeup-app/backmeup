import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TCreateServiceVariables } from "../../store";
import { createServiceSchema } from "../../utilities";
import { TFormControl } from "../Form";
import { useCreateService } from "../../store";

export const useFormConfig = () => {
  const createService = useCreateService();
  return (onClose?: () => void) => ({
    validationSchema: createServiceSchema,
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values: TCreateServiceVariables) => {
      await createService(values, onClose);
    },
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
        errorMessage:
          formik.touched?.name && formik.errors?.name ? (
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
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
        onBlur: formik.handleBlur,
        value: formik.values?.description,
      },
    },
  ];
};
