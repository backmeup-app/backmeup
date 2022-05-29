import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { createIpSchema } from "../../../utilities";

export const useFormConfig = () => {
  return () => ({
    validationSchema: createIpSchema,
    initialValues: {
      address: "",
    },
    onSubmit: () => {},
  });
};

export const useEditIpControls = () => {
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "address",
        label: <FormLabel>IP Address</FormLabel>,
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        errorMessage: formik.errors?.address ? (
          <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
        ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.address,
      },
    },
  ];
};
