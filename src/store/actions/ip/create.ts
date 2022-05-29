import { useContext, Dispatch } from "react";
import { TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TCreateIpAddressVariables } from "./types";

export const useCreateIpAddress = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return (variables: TCreateIpAddressVariables) => {
    const defaultService = (me?.services as TService[]).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "create.ip.address" });
  };
};
