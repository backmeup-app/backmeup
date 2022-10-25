import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { TAppAction, TIpAddress, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";

export const useDeleteIpAddress = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async (ip: TIpAddress, onClose?: () => void) => {
    const defaultService = ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "delete.ip.address" });

    try {
      const url = `/services/${defaultService.uuid}/ips/${ip.uuid}`;
      await client().delete(url);
      dispatch({ type: "DELETE_IP_ADDRESS", payload: ip });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${ip.value} deleted successfully`,
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
