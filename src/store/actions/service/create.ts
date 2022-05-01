import { useContext } from "react";
import { TCreateServiceResponse } from ".";
import { TUser } from "../..";
import { AppContext } from "../../../contexts";
import { client } from "../client";
import { TCreateServiceVariables } from "./types";

export const useCreateService = () => {
  const [{ me }, dispatch] = useContext(AppContext);

  return async (variables: TCreateServiceVariables, onClose?: () => void) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const {
        data: { service },
      } = await client().post<TCreateServiceResponse>("/services", variables);
      dispatch({ type: "CREATE_SERVICE", payload: service });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Service created successfully" },
      });
      if (!me?.default_service) {
        dispatch({
          type: "SET_USER",
          payload: { ...(me as TUser), default_service: service._id },
        });
      }
      onClose?.();
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
  };
};
