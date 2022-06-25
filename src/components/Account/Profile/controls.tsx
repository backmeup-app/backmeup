import { useContext, Dispatch } from "react";
import { FormLabel, FormErrorMessage, chakra } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";
import { updateUserPasswordSchema, updateUserSchema } from "../../../utilities";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";

export const useProfileConfig = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  return () => ({
    validationSchema: updateUserSchema,
    initialValues: {
      first_name: me?.first_name,
      last_name: me?.last_name,
      email: me?.email,
    },
    onSubmit: () => {},
  });
};

export const usePasswordConfig = () => {
  return () => ({
    validationSchema: updateUserPasswordSchema,
    initialValues: { password: "", password_confirmation: "" },
    onSubmit: () => {},
  });
};

export const useProfileControls = () => {
  const PencilEdit = chakra(HiOutlinePencilAlt);
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "first_name",
        label: <FormLabel>First name</FormLabel>,
        styleProps: { colSpan: 6, mb: 4, isRequired: true },
        errorMessage:
          formik.touched?.first_name && formik.errors?.first_name ? (
            <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.first_name,
      },
    },
    {
      type: "text",
      properties: {
        name: "last_name",
        label: <FormLabel>Last name</FormLabel>,
        styleProps: { colSpan: 6, mb: 4, isRequired: true },
        errorMessage:
          formik.touched?.last_name && formik.errors?.last_name ? (
            <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.last_name,
      },
    },
    {
      type: "text",
      properties: {
        name: "email",
        isDisabled: true,
        label: (
          <FormLabel d="flex" alignItems="center">
            Email <PencilEdit cursor="pointer" ml={2} fontSize="lg" />
          </FormLabel>
        ),
        styleProps: { colSpan: 6, mb: 4, isRequired: true },
        errorMessage:
          formik.touched?.email && formik.errors?.email ? (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.email,
      },
    },
  ];
};

export const usePasswordControls = () => {
  const EyeOpen = chakra(AiOutlineEye);
  const EyeClosed = chakra(AiOutlineEyeInvisible);
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "password",
        type: "password",
        label: <FormLabel>Password</FormLabel>,
        styleProps: { colSpan: 6, mb: 4, isRequired: true },
        rightElement: formik?.touched?.password && { children: <EyeOpen /> },
        errorMessage:
          formik.touched?.password && formik.errors?.password ? (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.password,
      },
    },
    {
      type: "text",
      properties: {
        name: "password_confirmation",
        type: "password",
        label: <FormLabel>Password Confirmation</FormLabel>,
        styleProps: { colSpan: 6, mb: 4, isRequired: true },
        rightElement: formik?.touched?.password_confirmation && {
          children: <EyeOpen />,
        },
        errorMessage:
          formik.touched?.password && formik.errors?.password_confirmation ? (
            <FormErrorMessage>
              {formik.errors.password_confirmation}
            </FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.password_confirmation,
      },
    },
  ];
};
