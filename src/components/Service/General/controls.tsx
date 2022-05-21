import { useContext, Dispatch } from "react";
import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { editServiceSchema } from "../../../utilities";

export const useFormConfig = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const services = me?.services as TService[];
  const defaultService = services.find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;

  return () => ({
    validationSchema: editServiceSchema,
    initialValues: {
      name: defaultService.name,
      description: defaultService.description,
    },
    onSubmit: async () => {},
  });
};

export const useGeneralControls = () => {
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
    {
      type: "textarea",
      properties: {
        name: "description",
        label: <FormLabel>Description</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values?.description,
      },
    },
  ];
};
