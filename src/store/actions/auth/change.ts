import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useParams, useHistory } from "react-router-dom";
import { TInitiateChangeAuthVariables, TInitiateChangeAuthResponse } from ".";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import {
  useErrorHandler,
  TError,
  redirectGoogleAuth,
} from "../../../utilities";
import { client } from "../client";

export const useInitiateChangeAuth = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async (
    variables: TInitiateChangeAuthVariables,
    onClose?: () => void
  ) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: variables?.email
        ? "initiate.change.auth.email"
        : "initiate.change.auth.google",
    });

    try {
      const {
        data: { token },
      } = await client().post<TInitiateChangeAuthResponse>(
        "/me/auth/initiate-change",
        variables
      );
      onClose?.();

      if (variables?.email)
        return dispatch({
          type: "SET_NOTIFICATION",
          payload: {
            status: "success",
            text: `A confirmation email has been sent to ${variables.email}`,
          },
        });

      const state = `auth_change.${token}`;
      redirectGoogleAuth(state);
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};

export const useChangeAuthEmail = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();
  const { token } = useParams<{ token: string }>();
  const history = useHistory();

  return async () => {
    try {
      await client().put(`/me/auth/change/${token}`);
      history.push("/account");
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: "Sign-in method changed to Email/Password",
        },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }
  };
};
