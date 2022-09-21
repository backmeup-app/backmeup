import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(1, "Name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters in length"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters in length"),
});
