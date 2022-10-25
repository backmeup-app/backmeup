import { AxiosError } from "axios";
import { useContext } from "react";
import { TEditServiceResponse } from ".";
import { AppContext } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";
import { TCreateServiceVariables } from "./types";

export const useCreateService = () => {
  const [, dispatch] = useContext(AppContext);
  const errorHandler = useErrorHandler();

  return async (variables: TCreateServiceVariables, onClose?: () => void) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "create.service" });

    try {
      const {
        data: { service },
      } = await client().post<TEditServiceResponse>("/services", variables);
      dispatch({ type: "CREATE_SERVICE", payload: service });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${service.name} created successfully`,
        },
      });
      dispatch({
        type: "UPDATE_USER",
        payload: { default_service: service._id },
      });
      onClose?.();
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
  };
};
