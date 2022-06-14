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
      const tokenExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      cookies.set("token", token, { expires: tokenExpiry });
      dispatch({ type: "SET_USER", payload: user });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Authenticated Successfully" },
      });
      dispatch({ type: "SET_LOADING", payload: false });
      const pause = new Promise((res) => setTimeout(res, 3000));
      await pause;
      window.location.href = window.location.origin;
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
