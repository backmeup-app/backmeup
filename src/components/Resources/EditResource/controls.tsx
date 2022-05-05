import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { TResource, useCreateResource } from "../../../store";
import { editServiceSchema } from "../../../utilities";

type TEditResource = Pick<TResource, "name" | "description" | "is_active">;

export const useFormConfig = () => {
  const createResource = useCreateResource();
  return (onClose?: () => void, values?: TEditResource) => ({
    validationSchema: editServiceSchema,
    initialValues: values ?? { name: "", description: "", is_active: true },
    onSubmit: async (values: TEditResource) => {
      await createResource(values, onClose);
    },
  });
};

export const useEditResourceControls = () => {
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
    {
      type: "switch",
      properties: {
        name: "is_active",
        label: <FormLabel>Status</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values?.is_active,
      },
    },
  ];
};
