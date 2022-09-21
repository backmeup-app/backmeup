import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { loginSchema } from "../../../utilities";

export const useFormConfig = () => {
  return () => ({
    validationSchema: loginSchema,
    initialValues: { email: "", password: "" },
    onSubmit: () => {},
  });
};

export const useLoginControls = () => {
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "email",
        type: "email",
        label: (
          <FormLabel mb={2} color="gray.800">
            Email
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4 },
        errorMessage:
          formik.touched?.email && formik.errors?.email ? (
            <FormErrorMessage fontSize="13.5px">
              {formik.errors.email}
            </FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.email,
      },
    },
    {
      type: "text",
      properties: {
        name: "password",
        type: "password",
        label: <FormLabel mb={2}>Password</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
        errorMessage:
          formik.touched?.password && formik.errors?.password ? (
            <FormErrorMessage fontSize="13.5px">
              {formik.errors.password}
            </FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.password,
      },
    },
  ];
};
