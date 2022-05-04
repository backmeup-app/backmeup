import { useContext } from "react";
import { AppContext } from "../../../contexts";
import { client } from "../client";
import { TUpdateUserResponse, TUpdateUserVariables } from "./types";

export const useUpdateUser = () => {
  const [, dispatch] = useContext(AppContext);

  return async (variables: TUpdateUserVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const {
        data: {
          user: { name, email, avatar, default_service },
        },
      } = await client().put<TUpdateUserResponse>("/me", variables);
      dispatch({
        type: "SET_USER",
        payload: { name, email, avatar, default_service },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Service changed successfully" },
      });
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
