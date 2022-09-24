import { useState } from "react";
import { FormLabel, FormErrorMessage, IconButton } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../..";
import { signupSchema } from "../../../utilities";
import { TSignupVariables } from "../../../store/actions/auth/types";
import { useSignup } from "../../../store";

export const useFormConfig = () => {
  const signup = useSignup();

  return () => ({
    validationSchema: signupSchema,
    initialValues: { name: "", email: "", password: "" },
    onSubmit: async (
      variables: Pick<TSignupVariables, "email" | "password"> & { name: string }
    ) => {
      const names = variables.name.split(" ");
      const first_name = names[0];
      const last_name = names.length === 1 ? "" : names.slice(1).join(" ");

      await signup({
        email: variables.email,
        password: variables.password,
        first_name,
        last_name,
      });
    },
  });
};

export const useSignupControls = () => {
  const [showPassword, setShowPassword] = useState(false);

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
          onChange: (event) => {
            handleChange("name", event);
          },
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
          onChange: (event) => {
            handleChange("email", event);
          },
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
          onChange: (event) => {
            handleChange("password", event);
          },
          value: formik.values?.password,
        },
      },
    ];
  };
};
