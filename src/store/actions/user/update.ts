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
        data: { user },
      } = await client().put<TUpdateUserResponse>("/me", variables);
      dispatch({ type: "SET_USER", payload: user });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Service changed successfully" },
      });
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
