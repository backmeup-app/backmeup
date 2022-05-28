import { useContext, Dispatch } from "react";
import { TDeleteApiKeyVariables } from ".";
import { TApiKey, TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";

export const useDeleteApiKey = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = (me?.services as TService[]).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;

  return async (variables: TDeleteApiKeyVariables) => {
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
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
