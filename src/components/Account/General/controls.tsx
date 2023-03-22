import { useContext, Dispatch } from "react";
import { FormLabel, FormErrorMessage, chakra } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, useUpdateUser } from "../../../store";
import { updateUserSchema } from "../../../utilities";
import { HiOutlinePencilAlt } from "react-icons/hi";

export const useGeneralConfig = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const updateUser = useUpdateUser();
  return () => ({
    validationSchema: updateUserSchema,
    initialValues: {
      first_name: me?.first_name as string,
      last_name: me?.last_name as string,
      email: me?.email as string,
    },
    onSubmit: async (values: {
      first_name: string;
      last_name: string;
      email: string;
    }) => {
      const { first_name, last_name } = values;
      await updateUser({ first_name, last_name });
    },
  });
};

export const useGeneralControls = () => {
  const PencilEdit = chakra(HiOutlinePencilAlt);
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
          name: "first_name",
          label: (
            <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>
              First name
            </FormLabel>
          ),
          styleProps: { colSpan: { base: 12, md: 6 }, mb: 4, isRequired: true },
          errorMessage:
            formik.touched?.first_name && formik.errors?.first_name ? (
              <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("first_name", event);
          },
          value: formik.values?.first_name,
        },
      },
      {
        type: "text",
        properties: {
          name: "last_name",
          label: (
            <FormLabel fontSize={{ base: "0.95rem", sm: "md" }}>
              Last name
            </FormLabel>
          ),
          styleProps: { colSpan: { base: 12, md: 6 }, mb: 4, isRequired: true },
          errorMessage:
            formik.touched?.last_name && formik.errors?.last_name ? (
              <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("last_name", event);
          },
          value: formik.values?.last_name,
        },
      },
      {
        type: "text",
        properties: {
          name: "email",
          isDisabled: true,
          label: (
            <FormLabel d="flex" alignItems="center">
              Email{" "}
            </FormLabel>
          ),
          styleProps: { colSpan: { base: 12, md: 6 }, mb: 4 },
          errorMessage:
            formik.touched?.email && formik.errors?.email ? (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("first_name", event);
          },
          value: formik.values?.email,
        },
      },
    ];
  };
};
