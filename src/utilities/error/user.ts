import { useContext, Dispatch } from "react";
import { AppContext, TAppNotification, TAppState } from "../../contexts";
import { TAppAction, TAppReducerAction } from "../../store";

export const useHandleUserError = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return (errorCode: String) => {
    const response: TAppReducerAction = {
      type: "SET_NOTIFICATION",
      payload: { status: "error", text: "" },
    };
    response.payload = response.payload as TAppNotification;

    switch (errorCode) {
      case "user-001":
        response.payload.text = "Incorrect email or password";
        break;
      case "user-002":
        response.payload.text = window.document.URL.includes("google")
          ? "Google authentication is not enabled for this user"
          : "Incorrect email or password";
        break;
      case "user-003":
        response.payload.text = "User with email exists already";
        break;
      case "user-004":
        response.payload.text = "We could not verify your email";
        break;
      case "user-005":
        response.payload.text = "There was a problem resetting your password";
        break;
      case "user-008":
        response.payload.text = "Password is incorrect!";
        break;
      default:
        response.payload.text = "We couldn't complete that request!";
    }
    dispatch({ ...response });
  };
};
