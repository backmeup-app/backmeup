import { useContext, Dispatch } from "react";
import { useParams } from "react-router-dom";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";
import { TChangeEmailInitialVariables, TResetEmailVariables } from "./types";

export const useResetEmail = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

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
    } catch (error) {}

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};

export const useChangeEmailInitial = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

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
    } catch (error) {}

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

  return async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await client().put(`/me/email/change/${token}`);
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {}
  };
};
