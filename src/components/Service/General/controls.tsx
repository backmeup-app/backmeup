import { useContext, Dispatch } from "react";
import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import {
  TAppAction,
  TService,
  TUpdateServiceVariables,
  useUpdateService,
} from "../../../store";
import {
  editServiceSchema,
  handleInputBlur,
  handleInputChange,
} from "../../../utilities";

export const useFormConfig = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const services = me?.services ?? [];
  const defaultService = services.find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;
  const updateService = useUpdateService();

  return () => ({
    validationSchema: editServiceSchema,
    initialValues: {
      name: defaultService?.name ?? "",
      description: defaultService?.description ?? "",
      backup_duration: defaultService?.backup_duration ?? "1w",
    },
    onSubmit: async (values: TUpdateServiceVariables) => {
      const service = (me?.services as TService[]).find(
        (service) =>
          service.name.toLowerCase() === (values?.name?.toLowerCase() as string)
      );
      if (!service || service._id === (me?.default_service as string))
        return await updateService(values);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "error",
          text: `You already have a service named ${service.name}`,
        },
      });
    },
  });
};

export const useGeneralControls = () => {
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        label: (
          <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>Name</FormLabel>
        ),
        autoFocus: true,
        styleProps: { colSpan: 12, mb: 4, isRequired: true },
        errorMessage:
          formik.touched?.name && formik.errors?.name ? (
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          ) : undefined,
        onBlur: () => {
          handleInputBlur(formik, "name");
        },
        onChange: (event) => {
          handleInputChange(formik, "name", event);
        },
        value: formik.values?.name,
      },
    },
    {
      type: "textarea",
      properties: {
        name: "description",
        label: (
          <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>
            Description
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4 },
        onBlur: () => {
          handleInputBlur(formik, "description");
        },
        onChange: (event) => {
          handleInputChange(formik, "description", event);
        },
        value: formik.values?.description,
      },
    },
    {
      type: "radiogroup",
      properties: {
        name: "backup_duration",
        label: (
          <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>
            Backup Duration
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 6 },
        onChange: (value: string) =>
          formik.setFieldValue("backup_duration", value),
        value: formik.values?.backup_duration,
        options: [
          {
            label: "1 week",
            value: "1w",
          },
          { label: "1 month", value: "1m" },
          { label: "3 months", value: "3m" },
        ],
      },
    },
  ];
};
