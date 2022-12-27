import { useContext, Dispatch, useMemo } from "react";
import { TFormControl } from "../..";
import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import {
  handleInputChange,
  handleInputBlur,
  deleteServiceSchema,
} from "../../../utilities";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService, useDeleteService } from "../../../store";

export const useFormConfig = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);
  const deleteService = useDeleteService();

  return (onClose?: () => void) => ({
    initialValues: {
      name: "",
      default_service: defaultService?.name?.toLowerCase(),
    },
    validationSchema: deleteServiceSchema,
    onSubmit: async ({ name }: { name: string }) => {
      await deleteService(onClose);
    },
  });
};

export const useDeleteServiceControls = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);

  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        autoFocus: true,
        label: (
          <FormLabel>
            Please type <b>{defaultService?.name}</b> to confirm
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4 },
        textTransform: "capitalize",
        errorMessage:
          formik.touched?.name && formik.errors?.name ? (
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          ) : undefined,
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
