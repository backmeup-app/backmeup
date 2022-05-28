import { useContext, Dispatch } from "react";
import { TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";
import { TCreateApiKeyVariables, TCreateApiKeyResponse } from ".";

export const useCreateApiKey = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = (me?.services as TService[]).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;

  return async (variables: TCreateApiKeyVariables, onClose?: () => void) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "create.api.key" });

    try {
      const url = `/services/${defaultService.uuid}/api-keys`;
      const {
        data: { apiKey },
      } = await client().post<TCreateApiKeyResponse>(url, variables);
      dispatch({ type: "CREATE_API_KEY", payload: apiKey });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${variables.name} created successfully`,
        },
      });
      onClose?.();
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
