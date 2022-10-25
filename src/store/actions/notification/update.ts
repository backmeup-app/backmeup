import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";
import {
  TUpdateNotificationsResponse,
  TUpdateNotificationsVariables,
} from "./types";

export const useUpdateNotifications = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async (variables: TUpdateNotificationsVariables) => {
    const defaultService = ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
    const url = `/services/${defaultService.uuid}/notifications`;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "update.notifications",
    });

    try {
      const {
        data: { notifications },
      } = await client().put<TUpdateNotificationsResponse>(url, variables);
      dispatch({ type: "UPDATE_SERVICE_NOTIFICATION", payload: notifications });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Updated successfully" },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
