import { FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { useChangeEmailInitial } from "../../../store";
import { changeEmailSchema } from "../../../utilities";

export const useFormConfig = () => {
  const changeEmailInitial = useChangeEmailInitial();

  return () => ({
    initialValues: { email: "" },
    validationSchema: changeEmailSchema,
    onSubmit: async (values: { email: string }) => {},
  });
};

export const useChangeEmailControls = () => {
  return (formik: any): TFormControl[] => {
    const handleChange = (
      field: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!formik.touched?.[field]) formik.touched[field] = true;
      formik.setFieldValue(field, event.target.value);
    };
    return [
      {
        type: "text",
        properties: {
          name: "email",
          label: (
            <FormLabel d="flex" mb={4} alignItems="center">
              Enter your new email address
            </FormLabel>
          ),
          styleProps: { colSpan: 12, mb: 4, isRequired: true },
          errorMessage:
            formik.touched?.email && formik.errors?.email ? (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange("email", event);
          },
          value: formik.values?.email,
        },
      },
    ];
  };
};
