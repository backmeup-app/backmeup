import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useParams } from "react-router-dom";
import { TAppAction, TResource, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";
import { TGetResourceResponse, TGetResources } from "./types";

export const useGetResources = () => {
  const [{ me }, dispatch] = useContext(AppContext);
  const errorHandler = useErrorHandler();

  return async () => {
    const service = me?.services?.find(
      (service) => service._id === me?.default_service
    ) as TService;

    if (!getResources(service)) return;

    dispatch({ type: "SET_LOADING", payload: true });

    let url = `/services/${service.uuid}/resources`;
    service.resources = service.resources as TResource[];
    url =
      service?.resources?.length > 0 &&
      !(service?.resources?.length === 1 && service?.resources[0]?.isSingle)
        ? url +
          `?after_uuid=${service.resources[service.resources.length - 1].uuid}`
        : url;

    try {
      const {
        data: { resources, hasMoreResources },
      } = await client().get<TGetResources>(url);

      dispatch({
        type: "GET_RESOURCES",
        payload: { resources, hasMoreResources, service_uuid: service.uuid },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};

const getResources = (service: TService) => {
  if (!service?.resources) return true;

  if (service.resources.length === 1 && service.resources[0]?.isSingle)
    return true;

  return service?.hasMoreResources === undefined
    ? true
    : service?.hasMoreResources;
};

export const useGetResource = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { resource_uuid } = useParams<{ resource_uuid: string }>();
  const errorHandler = useErrorHandler();

  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "get.resource" });
    const defaultService = me?.services?.find(
      (service) => service._id.toString() === me?.default_service
    ) as TService;
    const url = `/services/${defaultService.uuid}/resources/${resource_uuid}`;

    try {
      const {
        data: { resource },
      } = await client().get<TGetResourceResponse>(url);
      dispatch({
        type: "GET_RESOURCE",
        payload: { ...resource, service_uuid: defaultService.uuid },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
