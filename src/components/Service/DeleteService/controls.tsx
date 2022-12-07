import { TFormControl } from "../..";
import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { handleInputChange, handleInputBlur } from "../../../utilities";

export const useFormConfig = () => {
  return () => ({
    initialValues: { name: "" },
    onSubmit: async () => {},
  });
};

export const useDeleteServiceControls = () => {
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        autoFocus: true,
        label: (
          <FormLabel>
            Please type <b>Dorime</b> to confirm
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4 },
        textTransform: "capitalize",
        onBlur: (event) => {
          handleInputBlur(formik, "name");
        },
        onChange: (event) => {
          handleInputChange(formik, "name", event);
        },
        value: formik.values?.name,
      },
    },
  ];
};
