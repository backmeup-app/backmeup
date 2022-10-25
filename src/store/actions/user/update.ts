import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { useErrorHandler, TError } from "../../../utilities";
import { client } from "../client";
import {
  TResetUserPasswordInitialVariables,
  TUpdateUserPasswordVariables,
  TUpdateUserResponse,
  TUpdateUserVariables,
} from "./types";

export const useUpdateUser = () => {
  const [, dispatch] = useContext(AppContext);
  const errorHandler = useErrorHandler();

  return async (variables: TUpdateUserVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: variables?.default_service
        ? "update.default.service"
        : "update.user",
    });

    try {
      const {
        data: {
          user: { first_name, last_name, email, avatar, default_service },
        },
      } = await client().put<TUpdateUserResponse>("/me", variables);
      dispatch({
        type: "SET_USER",
        payload: { first_name, last_name, email, avatar, default_service },
      });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: variables?.default_service
            ? "Service changed successfully"
            : "Updated successfully",
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

export const useUpdateUserPassword = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async (variables: TUpdateUserPasswordVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({
      type: "SET_NETWORK_OPERATION",
      payload: "update.user.password",
    });

    try {
      await client().put("/me/password/change", variables);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Password updated successfully" },
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

export const useResetUserPasswordInitial = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const errorHandler = useErrorHandler();

  return async (
    variables: TResetUserPasswordInitialVariables,
    callback?: () => void
  ) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({
        type: "SET_NETWORK_OPERATION",
        payload: "reset.user.password.initial",
      });

      await client().post("/me/password/reset", { ...variables });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `A password reset link has been sent to ${variables.email}`,
        },
      });
      callback?.();
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};

export const useResetUserPassword = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const errorHandler = useErrorHandler();

  return async (variables: TUpdateUserPasswordVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "reset.user.password" });

    try {
      await client().put(`/me/password/change/${token}`, { ...variables });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { status: "success", text: "Password reset successfully" },
      });
      history.push("/session/new");
    } catch (error) {
      errorHandler(error as AxiosError<TError>);
    }

    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
  };
};
