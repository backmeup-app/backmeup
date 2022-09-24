import { useContext, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";
import { TVerifyGoogleAuth } from "./types";

export const useVerifyGoogleAuth = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const cookies = new Cookies();
  const history = useHistory();

  return async (code: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { data } = await client().post<TVerifyGoogleAuth>(
        `/tokens/google?code=${code}`
      );
      const { user, token } = data;
      const tokenExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      cookies.set("token", token, { path: "/", expires: tokenExpiry });
      dispatch({ type: "SET_USER", payload: user });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Logged in successfully" },
      });
      dispatch({ type: "SET_LOADING", payload: false });
      history.push("/resources");
    } catch (error) {
      console.log(error);
      history.push("/session/new");
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
