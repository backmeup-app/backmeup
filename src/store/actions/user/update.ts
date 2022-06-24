import { useContext } from "react";
import { AppContext } from "../../../contexts";
import { client } from "../client";
import { TUpdateUserResponse, TUpdateUserVariables } from "./types";

export const useUpdateUser = () => {
  const [, dispatch] = useContext(AppContext);

  return async (variables: TUpdateUserVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: variables?.default_service as string,
    });

    try {
      const {
        data: {
          user: { first_name, last_name, email, avatar, default_service },
        },
      } = await client().put<TUpdateUserResponse>("/me", variables);
      dispatch({
        type: "SET_USER",
        payload: { first_name, last_name, email, avatar, default_service },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Service changed successfully" },
      });
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "",
    });
  };
};
