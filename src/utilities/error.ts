import { Dispatch } from "react";
import { AxiosError } from "axios";
import { TAppAction, TAppReducerAction } from "../store";
import { TAppNotification } from "../contexts";

export type TError = { error: string; message: string; statusCode: number };

export const errorHandler = (
  error: AxiosError<TError>,
  dispatch: Dispatch<TAppAction>
) => {
  if (!error?.response?.data)
    return dispatch({
      type: "SET_NOTIFICATION",
      payload: { status: "error", text: "We couldn't complete that request!" },
    });

  const { error: errorCode } = error.response.data;
  const errorResource = errorCode.split("-")[0];
  console.log(errorCode);

  switch (errorResource) {
    case "user":
      return handleUserError(errorCode, dispatch);
    default:
    //
  }

  dispatch({
    type: "SET_NOTIFICATION",
    payload: { status: "error", text: "Try again later!" },
  });
};

const handleUserError = (errorCode: string, dispatch: Dispatch<TAppAction>) => {
  const response: TAppReducerAction = {
    type: "SET_NOTIFICATION",
    payload: { status: "error", text: "" },
  };
  response.payload = response.payload as TAppNotification;
  switch (errorCode) {
    case "user-001":
      response.payload.text = "Incorrect email or password";
      break;
    case "user-003":
      response.payload.text = "User with email exists already";
      break;
    case "user-004":
      response.payload.text = "Incorrect verification token";
      break;
    default:
      response.payload.text = "We couldn't complete that request!";
  }
  dispatch({ ...response });
};
