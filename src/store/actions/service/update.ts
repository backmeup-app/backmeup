import { useContext, Dispatch } from "react";
import { TEditServiceResponse, TUpdateServiceVariables } from ".";
import { TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";

export const useUpdateService = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = ((me?.services as TService[]) ?? []).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;

  return async (variables: TUpdateServiceVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "update.service" });

    try {
      const url = `/services/${defaultService.uuid}`;
      const {
        data: { service },
      } = await client().put<TEditServiceResponse>(url, variables);
      dispatch({ type: "UPDATE_SERVICE", payload: service });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          text: `${variables.name} updated successfully`,
          status: "success",
        },
      });
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
