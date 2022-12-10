import { useContext, Dispatch, useMemo } from "react";
import * as Yup from "yup";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction, TService } from "../../store";

const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const editServiceSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(1, "Name is required"),
  description: Yup.string(),
});

export const createApiKeySchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(1, "Name is required"),
});

export const createIpSchema = Yup.object().shape({
  address: Yup.string()
    .required("IP Address is required")
    .matches(ipRegex, "IP Address is not valid"),
});

export const deleteServiceSchema = Yup.object().shape({
  default_service: Yup.string().required(""),
  name: Yup.string()
    .lowercase()
    .oneOf([Yup.ref("default_service"), null], "Incorrect service name"),
});
