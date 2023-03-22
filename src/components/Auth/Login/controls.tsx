import { useState, useContext, Dispatch } from "react";
import {
  FormLabel,
  FormErrorMessage,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../..";
import {
  handleInputBlur,
  handleInputChange,
  loginSchema,
} from "../../../utilities";
import {
  TAppAction,
  useLogin,
  useResetUserPasswordInitial,
} from "../../../store";
import { TLoginVariables } from "../../../store";
import { AppContext, TAppState } from "../../../contexts";

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
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const resetUserPasswordInitial = useResetUserPasswordInitial();

  return (formik: any): TFormControl[] => {
    const handleForgotPassword = async () => {
      if (formik.values?.email.length === 0)
        return dispatch({
          type: "SET_NOTIFICATION",
          payload: { status: "error", text: "Enter a valid email address" },
        });

      if (formik.errors?.email)
        return dispatch({
          type: "SET_NOTIFICATION",
          payload: { status: "error", text: "Invalid email address" },
        });

      await resetUserPasswordInitial(
        { email: formik.values?.email ?? "" },
        () => {
          formik.setFieldValue("email", "");
          formik.setFieldTouched("email", false);
        }
      );
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
          type: showPassword ? "text" : "password",
          label: (
            <Box mb={1} d="flex" justifyContent="space-between">
              <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>
                <Text>Password</Text>
              </FormLabel>
              <Text
                cursor="pointer"
                fontSize={{ base: "0.95rem", sm: "md" }}
                onClick={handleForgotPassword}
              >
                Forgot ?
              </Text>
            </Box>
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
};
