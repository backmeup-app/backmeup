import { useContext } from "react";
import { AppContext } from "../../../contexts";
import { client } from "../client";
import { TEditResourceResponse, TEditResourceVariables } from "./types";

export const useCreateResource = () => {
  const [{ me }, dispatch] = useContext(AppContext);

  return async (variables: TEditResourceVariables, onClose?: () => void) => {
    const service_uuid = me?.services?.find(
      (service) => service._id === me?.default_service
    )?.uuid as string;
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const url = `/services/${service_uuid}/resources`;
      const {
        data: { resource },
      } = await client().post<TEditResourceResponse>(url, variables);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Resource created successfully" },
      });
      dispatch({
        type: "CREATE_RESOURCE",
        payload: { ...resource, service_uuid },
      });
      onClose?.();
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
  };
};
