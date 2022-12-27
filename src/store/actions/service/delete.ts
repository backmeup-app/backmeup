import { AxiosError } from "axios";
import { useContext, Dispatch, useMemo } from "react";
import { TAppAction, TService } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";

export const useDeleteService = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);
  const errorHandler = useErrorHandler();

  return async (onClose?: () => void) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "delete.service" });

    try {
      await client().delete(`/services/${defaultService?.uuid ?? ""}`);
      dispatch({ type: "DELETE_SERVICE", payload: defaultService });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${defaultService.name} has been deleted successfully`,
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
