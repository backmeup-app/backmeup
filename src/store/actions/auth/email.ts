import { AxiosError } from "axios";
import { useContext, Dispatch } from "react";
import { useParams, useHistory } from "react-router-dom";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TError, useErrorHandler } from "../../../utilities";
import { client } from "../client";

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
