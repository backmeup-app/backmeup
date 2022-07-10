import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { useCreateIpAddress } from "../../../store";
import { createIpSchema } from "../../../utilities";

export const useFormConfig = () => {
  const createIpAddress = useCreateIpAddress();
  return (onClose?: () => void) => ({
    validationSchema: createIpSchema,
    initialValues: {
      address: "",
    },
    onSubmit: async (values: { address: string }) => {
      await createIpAddress({ value: values.address }, onClose);
    },
  });
};

export const useEditIpControls = () => {
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
          name: "address",
          label: <FormLabel>IP Address</FormLabel>,
          styleProps: { colSpan: 12, mb: 4, isRequired: true },
          errorMessage: formik.errors?.address ? (
            <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
          ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("address", event);
          },
          value: formik.values?.address,
        },
      },
    ];
  };
};
