import { useContext, Dispatch } from "react";
import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const useFormConfig = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return () => ({
    initialValues: {
      name: "",
    },
    onSubmit: () => {},
  });
};

export const useCreateApiKeyControls = () => {
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        label: <FormLabel>Name</FormLabel>,
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        errorMessage:
          formik.touched?.name && formik.errors?.name ? (
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.name,
      },
    },
  ];
};
