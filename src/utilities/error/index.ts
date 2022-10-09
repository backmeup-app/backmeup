import { useContext, Dispatch } from "react";
import { AxiosError } from "axios";
import { TAppAction } from "../../store";
import { AppContext, TAppState } from "../../contexts";
import { useHandleUserError } from "./user";

export type TError = { error: string; message: string; statusCode: number };

export const useErrorHandler = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const handleUserError = useHandleUserError();

  return (error: AxiosError<TError>) => {
    if (!error?.response?.data)
      return dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "error",
          text: "We couldn't complete that request!",
        },
      });

    const { error: errorCode } = error.response.data;
    const errorResource = errorCode.split("-")[0];
    console.log(errorCode);

    switch (errorResource) {
      case "user":
        return handleUserError(errorCode);
      default:
      //
    }

    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        status: "error",
        text: "Something went wrong with that request. Try again later!",
      },
    });
  };
};
