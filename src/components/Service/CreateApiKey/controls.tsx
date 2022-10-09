import { useContext, Dispatch } from "react";
import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService, useCreateApiKey } from "../../../store";
import { createApiKeySchema } from "../../../utilities";

export const useFormConfig = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const createApiKey = useCreateApiKey();
  const defaultService = ((me?.services as TService[]) ?? []).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;

  return (onClose?: () => void) => ({
    validationSchema: createApiKeySchema,
    initialValues: {
      name: "",
    },
    onSubmit: async (values: { name: string }) => {
      if (
        (defaultService.api_keys ?? [])
          .map(({ name }) => name.toLowerCase())
          .includes(values.name.toLowerCase())
      ) {
        return dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            status: "error",
            text: `${values.name} exists already`,
          },
        });
      }
      await createApiKey({ ...values }, onClose);
    },
  });
};

export const useCreateApiKeyControls = () => {
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
          name: "name",
          autoFocus: true,
          label: <FormLabel>Name</FormLabel>,
          styleProps: { colSpan: 12, mb: 4, isRequired: true },
          errorMessage: formik.errors?.name ? (
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("name", event);
          },
          value: formik.values?.name,
        },
      },
    ];
  };
};
