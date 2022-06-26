import { useState } from "react";
import { FormLabel, FormErrorMessage, chakra } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../../..";
import { useResetEmail } from "../../../../store";
import { resetEmailSchema } from "../../../../utilities";

export const useFormConfig = () => {
  const resetEmail = useResetEmail();

  return (onClose?: () => void) => ({
    initialValues: { password: "" },
    validationSchema: resetEmailSchema,
    onSubmit: async (values: { password: string }) => {
      const { password } = values;
      await resetEmail({ password }, onClose);
    },
  });
};

export const useResetEmailControls = () => {
  const EyeOpen = chakra(AiOutlineEye);
  const EyeClosed = chakra(AiOutlineEyeInvisible);
  const [show, setShow] = useState(false);

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
          name: "password",
          type: show ? "text" : "password",
          label: (
            <FormLabel mb={4}>
              Enter your Backmeup password to get started
            </FormLabel>
          ),
          styleProps: { colSpan: 12, mb: 3, isRequired: true },
          rightElement: formik?.touched?.password && {
            children: show ? (
              <EyeClosed
                cursor="pointer"
                onClick={() => {
                  setShow(false);
                }}
              />
            ) : (
              <EyeOpen
                cursor="pointer"
                onClick={() => {
                  setShow(true);
                }}
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
