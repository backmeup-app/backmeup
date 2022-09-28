import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import {
  TResource,
  useCreateResource,
  useUpdateResource,
} from "../../../store";
import { editServiceSchema } from "../../../utilities";

type TEditResource = Pick<TResource, "name" | "description" | "is_active"> & {
  uuid?: string;
};

export const useFormConfig = () => {
  const createResource = useCreateResource();
  const updateResource = useUpdateResource();
  return (onClose?: () => void) => ({
    validationSchema: editServiceSchema,
    initialValues: { name: "", description: "", is_active: true },
    onSubmit: async (values: TEditResource) => {
      if (values.uuid) {
        const resource_uuid = values.uuid;
        delete values.uuid;
        return await updateResource(resource_uuid, values, onClose);
      }
      await createResource(values, onClose);
    },
  });
};

export const useEditResourceControls = () => {
  return (formik: any): TFormControl[] => {
    const handleChange = (
      field: string,
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (!formik.touched?.[field]) formik.touched[field] = true;
      formik.setFieldValue(field, event.target.value);
    };
    return [
      {
        type: "text",
        properties: {
          name: "name",
          label: <FormLabel>Name</FormLabel>,
          styleProps: { colSpan: 12, mb: 4, isRequired: true },
          autoFocus: true,
          errorMessage:
            formik.touched?.name && formik.errors?.name ? (
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("name", event);
          },
          value: formik.values?.name,
        },
      },
      {
        type: "textarea",
        properties: {
          name: "description",
          label: <FormLabel>Description</FormLabel>,
          styleProps: { colSpan: 12, mb: 4 },
          onChange: (event) => {
            handleChange("description", event);
          },
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
};
