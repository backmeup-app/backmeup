import { useState } from "react";
import { FormLabel, FormErrorMessage, IconButton } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../..";
import {
  handleInputBlur,
  handleInputChange,
  updateUserPasswordSchema,
} from "../../../utilities";
import { useResetUserPassword } from "../../../store";
import { TUpdateUserPasswordVariables } from "../../../store/actions/user/types";

export const useFormConfig = () => {
  const resetUserPassword = useResetUserPassword();

  return () => ({
    validationSchema: updateUserPasswordSchema,
    initialValues: { password: "" },
    onSubmit: async (variables: TUpdateUserPasswordVariables) => {
      alert("leke");
      await resetUserPassword({ ...variables });
    },
  });
};

export const useResetPasswordControls = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "password",
        type: showPassword ? "text" : "password",
        autoFocus: true,
        label: (
          <FormLabel mb={2} color="gray.800">
            Password
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
