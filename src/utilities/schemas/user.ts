import * as Yup from "yup";

export const updateUserSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
});

export const updateUserPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters in length"),
  password_confirmation: Yup.string()
    .required("Passwords must match")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const resetEmailSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters in length"),
});

export const changeEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
});
