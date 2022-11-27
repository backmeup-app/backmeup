import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { useErrorHandler, TError } from "../../../utilities";
import { client } from "../client";
import { TLoginResponse, TLoginVariables, TVerifyGoogleAuth } from "./types";

export const useLogin = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const cookies = new Cookies();
  const history = useHistory();
  const errorHandler = useErrorHandler();

  return async (variables: TLoginVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "user.login" });
    try {
      const {
        data: { user, token },
      } = await client().post<TLoginResponse>("/tokens", { ...variables });

      const tokenExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      cookies.set("token", token, { path: "/", expires: tokenExpiry });
      dispatch({ type: "SET_USER", payload: user });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Logged in successfully" },
      });
      history.push("/resources");
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
      history.push("/session/new");
    }
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
    dispatch({ type: "SET_LOADING", payload: false });
  };
};

export const useVerifyGoogleAuth = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const cookies = new Cookies();
  const history = useHistory();
  const errorHandler = useErrorHandler();
  const params = new URLSearchParams(window.location.search);

  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const code = params.get("code");
    const state = params.get("state");

    try {
      if (state)
        await handleGoogleAuthChange(dispatch, code ?? "", state, history);
      else await handleGoogleLogin(dispatch, code ?? "", history);
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
      history.push("/session/new");
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};

const handleGoogleLogin = async (
  dispatch: Dispatch<TAppAction>,
  code: string,
  history: { push: (route: string) => void }
) => {
  const { data } = await client().post<TVerifyGoogleAuth>(
    `/tokens/google?code=${code}`
  );
  const { user, token } = data;
  const cookies = new Cookies();
  const tokenExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  cookies.set("token", token, { path: "/", expires: tokenExpiry });
  dispatch({ type: "SET_USER", payload: user });
  dispatch({
    type: "SET_NOTIFICATION",
    payload: { status: "success", text: "Logged in successfully" },
  });
  history.push("/resources");
};

const handleGoogleAuthChange = async (
  dispatch: Dispatch<TAppAction>,
  code: string,
  state: string,
  history: { push: (route: string) => void }
) => {
  await client().put(`/me/auth/change/google?code=${code}&state=${state}`);
  dispatch({
    type: "SET_NOTIFICATION",
    payload: {
      status: "success",
      text: "Sign-in method successfully changed to Google",
    },
  });
  history.push("/account");
};
