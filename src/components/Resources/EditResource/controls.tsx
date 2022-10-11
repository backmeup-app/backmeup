import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import {
  TResource,
  useCreateResource,
  useUpdateResource,
} from "../../../store";
import {
  editServiceSchema,
  handleInputBlur,
  handleInputChange,
} from "../../../utilities";

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
    return [
      {
        type: "text",
        properties: {
          name: "name",
          label: <FormLabel>Name</FormLabel>,
          styleProps: { colSpan: 12, mb: 4, isRequired: true },
          autoFocus: true,
          textTransform: "capitalize",
          errorMessage:
            formik.touched?.name && formik.errors?.name ? (
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            ) : undefined,
          onBlur: () => {
            handleInputBlur(formik, "name");
          },
          onChange: (event) => {
            handleInputChange(formik, "name", event);
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
          onBlur: () => {
            handleInputBlur(formik, "description");
          },
          onChange: (event) => {
            handleInputChange(formik, "description", event);
          },
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
