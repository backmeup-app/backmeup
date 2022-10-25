import { AxiosError } from "axios";
import { useContext } from "react";
import { AppContext } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";
import { TGetUser } from "./types";

export const useGetUser = () => {
  const [, dispatch] = useContext(AppContext);
  const errorHandler = useErrorHandler();

  return async () => {
    try {
      const {
        data: { user },
      } = await client().get<TGetUser>("/me");
      dispatch({ type: "SET_USER", payload: user });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }
  };
};
