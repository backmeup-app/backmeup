import { useContext, Dispatch } from "react";
import Cookies from "universal-cookie";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";
import { TVerifyGoogleAuth } from "./types";

export const useVerifyGoogleAuth = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const cookies = new Cookies();

  return async (code: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await client().post<TVerifyGoogleAuth>(
        `/tokens?code=${code}`
      );
      const { user, token } = data;
      cookies.set("token", token);
      dispatch({ type: "SET_USER", payload: user });
      window.location.href = window.location.origin;
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
