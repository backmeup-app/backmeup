import { useContext, Dispatch } from "react";
import { TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";
import { TCreateIpAddressResponse, TCreateIpAddressVariables } from "./types";

export const useCreateIpAddress = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return async (variables: TCreateIpAddressVariables, onClose?: () => void) => {
    const defaultService = (me?.services as TService[]).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "create.ip.address" });

    try {
      const url = `/services/${defaultService.uuid}/ips`;
      const {
        data: { ip },
      } = await client().post<TCreateIpAddressResponse>(url, variables);
      dispatch({ type: "CREATE_IP_ADDRESS", payload: ip });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${variables.value} added successfully`,
        },
      });
      onClose?.();
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
