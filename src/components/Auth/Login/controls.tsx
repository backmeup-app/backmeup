import { useState } from "react";
import {
  FormLabel,
  FormErrorMessage,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../..";
import { loginSchema } from "../../../utilities";
import { useLogin } from "../../../store";
import { TLoginVariables } from "../../../store";

export const useFormConfig = () => {
  const login = useLogin();

  return () => ({
    validationSchema: loginSchema,
    initialValues: { email: "", password: "" },
    onSubmit: async (variables: TLoginVariables) => {
      await login({ ...variables });
    },
  });
};

export const useLoginControls = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (formik: any): TFormControl[] => {
    const handleChange = (
      field: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!formik.touched?.[field]) formik.touched[field] = true;
      formik.setFieldValue(field, event.target.value);
    };

    const handleBlur = (field: string) => {
      if (!formik.touched?.[field] && formik.values[field].trim().length > 0)
        formik.setFieldTouched(field, true);
    };

    return [
      {
        type: "text",
        properties: {
          name: "email",
          type: "email",
          autoFocus: true,
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
          onBlur: () => {
            handleBlur("email");
          },
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
          label: (
            <FormLabel mb={2} d="flex" justifyContent="space-between">
              <Text>Password</Text>
              <Text cursor="pointer">Forgot ?</Text>
            </FormLabel>
          ),
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
              <FormErrorMessage fontSize="13.5px">
                {formik.errors.password}
              </FormErrorMessage>
            ) : undefined,
          onBlur: () => {
            handleBlur("password");
          },
          onChange: (event) => {
            handleChange("password", event);
          },
          value: formik.values?.password,
        },
      },
    ];
  };
};
