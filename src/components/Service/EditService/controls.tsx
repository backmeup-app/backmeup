import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TCreateServiceVariables } from "../../../store";
import {
  editServiceSchema,
  handleInputBlur,
  handleInputChange,
} from "../../../utilities";
import { TFormControl } from "../../Form";
import { useCreateService } from "../../../store";

export const useFormConfig = () => {
  const createService = useCreateService();
  return (onClose?: () => void) => ({
    validationSchema: editServiceSchema,
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
  return (formik: any): TFormControl[] => {
    return [
      {
        type: "text",
        properties: {
          name: "name",
          autoFocus: true,
          label: (
            <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>Name</FormLabel>
          ),
          styleProps: { colSpan: 12, mb: 4, isRequired: true },
          textTransform: "capitalize",
          errorMessage:
            formik.touched?.name && formik.errors?.name ? (
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            ) : undefined,
          onBlur: (event) => {
            handleInputBlur(formik, "name");
          },
          onChange: (event) => {
            handleInputChange(formik, "name", event);
          },
          value: formik.values?.name,
        },
      },
      // {
      //   type: "textarea",
      //   properties: {
      //     name: "description",
      //     label: <FormLabel fontSize={{ base: "0.95rem", sm:"md"  }}>Description</FormLabel>,
      //     styleProps: { colSpan: 12, mb: 4 },
      //     onChange: (event: any) => {
      //       handleChange("description", event);
      //     },
      //     onBlur: formik.handleBlur,
      //     value: formik.values?.description,
      //   },
      // },
    ];
  };
};
