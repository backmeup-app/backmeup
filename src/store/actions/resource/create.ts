import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../contexts";
import { capitalize } from "../../../utilities";
import { client } from "../client";
import { TEditResourceResponse, TEditResourceVariables } from "./types";

export const useCreateResource = () => {
  const [{ me }, dispatch] = useContext(AppContext);
  const history = useHistory();

  return async (variables: TEditResourceVariables, onClose?: () => void) => {
    const service_uuid = me?.services?.find(
      (service) => service._id === me?.default_service
    )?.uuid as string;

    if (me?.email_verification_token) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "error", text: `${me?.email} is not verified` },
      });
      return history.push("/profile");
    }

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "create.resource" });

    try {
      const url = `/services/${service_uuid}/resources`;
      const {
        data: { resource },
      } = await client().post<TEditResourceResponse>(url, variables);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${capitalize(variables.name ?? "")} created successfully`,
        },
      });
      dispatch({
        type: "CREATE_RESOURCE",
        payload: { ...resource, service_uuid },
      });
      onClose?.();
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
