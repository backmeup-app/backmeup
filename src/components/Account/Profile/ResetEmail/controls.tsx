import { useState } from "react";
import { FormLabel, FormErrorMessage, IconButton } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../../..";
import { useResetEmail } from "../../../../store";
import { resetEmailSchema } from "../../../../utilities";

export const useFormConfig = () => {
  const resetEmail = useResetEmail();

  return (onClose?: () => void) => ({
    initialValues: { user_password: "" },
    validationSchema: resetEmailSchema,
    onSubmit: async (values: { user_password: string }) => {
      const { user_password } = values;
      await resetEmail({ password: user_password }, onClose);
    },
  });
};

export const useResetEmailControls = () => {
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
          name: "user_password",
          type: show ? "text" : "password",
          label: (
            <FormLabel mb={4}>
              Enter your Backmeup password to get started
            </FormLabel>
          ),
          styleProps: { colSpan: 12, mb: 3 },
          rightElement: formik?.touched?.user_password &&
            formik.values?.user_password.length > 0 && {
              children: show ? (
                <IconButton
                  aria-label="Button"
                  variant="ghost"
                  icon={<AiOutlineEyeInvisible />}
                  onClick={() => {
                    setShow(false);
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
                    setShow(true);
                  }}
                  fontSize="lg"
                  cursor="pointer"
                />
              ),
            },
          errorMessage:
            formik.touched?.user_password && formik.errors?.user_password ? (
              <FormErrorMessage>{formik.errors.user_password}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("user_password", event);
          },
          value: formik.values?.user_password,
        },
      },
    ];
  };
};
