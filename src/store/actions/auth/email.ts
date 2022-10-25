import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useParams, useHistory } from "react-router-dom";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";
import { TChangeEmailInitialVariables, TResetEmailVariables } from "./types";

export const useSendVerificationEmail = () => {
  const [{ loading }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async () => {
    if (loading) return;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "resend.verification.email",
    });

    try {
      await client().post("/me/verification-email/send");
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: "Verification email sent successfully",
        },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};

export const useVerifyEmail = () => {
  const [{ me }, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { token } = useParams<{ token: string }>();
  const history = useHistory();
  const errorHandler = useErrorHandler();

  return async () => {
    try {
      await client().post(`/me/verify/${token}`);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `${me?.email ?? "Email Address"} verified successfully`,
        },
      });
      history.push("/");
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }
  };
};

export const useResetEmail = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async (variables: TResetEmailVariables, onClose?: () => void) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "user.reset.email" });

    try {
      await client().post("/me/email/reset", variables);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Check your email inbox" },
      });
      onClose?.();
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};

export const useChangeEmailInitial = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async (variables: TChangeEmailInitialVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "user.change.email.initial",
    });

    try {
      await client().post("/me/email/verify/" + variables.token, {
        email: variables.email,
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `Check ${variables.email}'s inbox`,
        },
      });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "",
    });
  };
};

export const useChangeEmailFinal = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { token } = useParams<{ token: string }>();
  const errorHandler = useErrorHandler();

  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await client().put(`/me/email/change/${token}`);
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };
};
