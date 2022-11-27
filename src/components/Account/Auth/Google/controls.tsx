import { useState } from "react";
import { IconButton, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {
  handleInputBlur,
  handleInputChange,
  updateAuthGoogleSchema,
} from "../../../../utilities";
import { TFormControl } from "../../..";
import { useInitiateChangeAuth } from "../../../../store";

export const useGoogleConfig = () => {
  const initiateChangeAuth = useInitiateChangeAuth();

  return (onClose?: () => void) => ({
    initialValues: { password: "" },
    validationSchema: updateAuthGoogleSchema,
    onSubmit: async (variables: { password: string }) => {
      await initiateChangeAuth({ ...variables }, onClose);
    },
  });
};

export const useGoogleControls = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "password",
        type: showPassword ? "text" : "password",
        label: <FormLabel>Password</FormLabel>,
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        rightElement: formik?.touched?.password &&
          formik.values?.password.length > 0 && {
            children: showPassword ? (
              <IconButton
                aria-label="button"
                cursor="pointer"
                variant="ghost"
                onClick={() => {
                  setShowPassword(false);
                }}
                fontSize="lg"
                icon={<AiOutlineEyeInvisible />}
              />
            ) : (
              <IconButton
                aria-label="button"
                cursor="pointer"
                variant="ghost"
                onClick={() => {
                  setShowPassword(true);
                }}
                fontSize="lg"
                icon={<AiOutlineEye />}
              />
            ),
          },
        errorMessage:
          formik.touched?.password && formik.errors?.password ? (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          ) : undefined,
        onBlur: (e) => {
          handleInputBlur(formik, "password");
        },
        onChange: (event) => {
          handleInputChange(formik, "password", event);
        },
        value: formik.values?.password,
      },
    },
  ];
};
