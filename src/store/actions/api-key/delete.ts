import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { TDeleteApiKeyVariables } from ".";
import { TApiKey, TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";

export const useDeleteApiKey = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = (me?.services as TService[]).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;
  const errorHandler = useErrorHandler();

  return async (variables: TDeleteApiKeyVariables, onClose?: () => void) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "delete.api.key" });

    try {
      const apiKey = (defaultService.api_keys ?? []).find(
        (key) => key.uuid === variables.uuid
      ) as TApiKey;
      const url = `/services/${defaultService.uuid}/api-keys/${variables.uuid}`;
      await client().delete(url);
      dispatch({ type: "DELETE_API_KEY", payload: apiKey });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${apiKey.name} deleted successfully`,
        },
      });
      onClose?.();
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
