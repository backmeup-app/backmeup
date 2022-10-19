import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";
import { TGetResourceResponse, TGetResources } from "./types";

export const useGetResources = () => {
  const [{ me }, dispatch] = useContext(AppContext);

  return async (service_uuid: string) => {
    const service = me?.services?.find(
      (service) => service.uuid === service_uuid
    );
    const page = service?.resourcePagination
      ? service.resourcePagination.currentPage + 1
      : 1;
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const url = `/services/${service_uuid}/resources`;
      const {
        data: { resources, pagination },
      } = await client().get<TGetResources>(url, { params: { page } });

      dispatch({
        type: "GET_RESOURCES",
        payload: { resources, pagination, service_uuid },
      });
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
  };
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
