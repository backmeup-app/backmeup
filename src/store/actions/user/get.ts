import { useContext } from "react";
import { AppContext } from "../../../contexts";
import { client } from "../client";
import { TGetUser } from "./types";

export const useGetUser = () => {
  const [, dispatch] = useContext(AppContext);

  return async () => {
    try {
      const {
        data: { user },
      } = await client().get<TGetUser>("/me");
      dispatch({ type: "SET_USER", payload: user });
    } catch (error) {}
  };
};
