import { useState } from "react";
import { FormLabel, FormErrorMessage, IconButton } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../..";
import { signupSchema } from "../../../utilities";

export const useFormConfig = () => {
  return () => ({
    validationSchema: signupSchema,
    initialValues: { name: "", last_name: "", email: "", password: "" },
    onSubmit: () => {},
  });
};

export const useSignupControls = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        type: "text",
        autoFocus: true,
        label: <FormLabel mb={2}>Name</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
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
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
        type: showPassword ? "text" : "password",
        label: <FormLabel mb={2}>Password</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
        rightElement: formik?.touched?.password &&
          formik.values?.password.length > 0 && {
            children: showPassword ? (
              <IconButton
                aria-label="Button"
                variant="ghost"
                icon={<AiOutlineEyeInvisible />}
                onClick={() => {
                  setShowPassword(false);
                }}
                fontSize="lg"
                cursor="pointer"
              />
            ) : (
              <IconButton
                aria-label="Button"
                variant="ghost"
                icon={<AiOutlineEye />}
                onClick={() => {
                  setShowPassword(true);
                }}
                fontSize="lg"
                cursor="pointer"
              />
            ),
          },
        errorMessage:
          formik.touched?.password && formik.errors?.password ? (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.password,
      },
    },
  ];
};
