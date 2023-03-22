import { useState } from "react";
import { FormLabel, FormErrorMessage, IconButton } from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TFormControl } from "../../..";
import {
  handleInputBlur,
  handleInputChange,
  updateAuthEmailSchema,
} from "../../../../utilities";
import { TLoginVariables, useInitiateChangeAuth } from "../../../../store";

export const useEmailPasswordConfig = () => {
  const initiateChangeAuth = useInitiateChangeAuth();

  return (onClose?: () => void) => ({
    initialValues: { email: "", password: "", password_confirmation: "" },
    validationSchema: updateAuthEmailSchema,
    onSubmit: async (
      variables: TLoginVariables & { password_confirmation: string }
    ) => {
      const params = (({ email, password }) => ({ email, password }))(
        variables
      );
      await initiateChangeAuth({ ...params }, onClose);
    },
  });
};

export const useEmailPasswordControls = () => {
  const [show, setShow] = useState<{
    [key in "password" | "password_confirmation"]: boolean;
  }>({ password: false, password_confirmation: false });

  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "email",
        autoFocus: true,
        label: (
          <FormLabel d="flex" alignItems="center">
            Email{" "}
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        errorMessage:
          formik.touched?.email && formik.errors?.email ? (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          ) : undefined,
        onBlur: (e) => {
          handleInputBlur(formik, "email");
        },
        onChange: (event) => {
          handleInputChange(formik, "email", event);
        },
        value: formik.values?.email,
      },
    },
    {
      type: "text",
      properties: {
        name: "password",
        type: show.password ? "text" : "password",
        label: (
          <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>
            Password
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        rightElement: formik?.touched?.password &&
          formik.values?.password.length > 0 && {
            children: show.password ? (
              <IconButton
                aria-label="button"
                cursor="pointer"
                variant="ghost"
                onClick={() => {
                  setShow({ ...show, password: false });
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
                  setShow({ ...show, password: true });
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
    {
      type: "text",
      properties: {
        name: "password_confirmation",
        type: show.password_confirmation ? "text" : "password",
        label: (
          <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>
            Confirm Password
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        rightElement: formik?.touched?.password_confirmation &&
          formik.values?.password_confirmation.length > 0 && {
            children: show.password_confirmation ? (
              <IconButton
                aria-label="button"
                cursor="pointer"
                variant="ghost"
                onClick={() => {
                  setShow({ ...show, password_confirmation: false });
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
                  setShow({ ...show, password_confirmation: true });
                }}
                fontSize="lg"
                icon={<AiOutlineEye />}
              />
            ),
          },
        errorMessage:
          formik.touched?.password_confirmation &&
          formik.errors?.password_confirmation ? (
            <FormErrorMessage>
              {formik.errors.password_confirmation}
            </FormErrorMessage>
          ) : undefined,
        onBlur: (e) => {
          handleInputBlur(formik, "password_confirmation");
        },
        onChange: (event) => {
          handleInputChange(formik, "password_confirmation", event);
        },
        value: formik.values?.password_confirmation,
      },
    },
  ];
};
