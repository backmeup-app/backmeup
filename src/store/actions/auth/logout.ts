import { useContext, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";

export const useLogout = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const history = useHistory();
  const cookies = new Cookies();

  return () => {
    cookies.remove("token", { path: "/" });
    dispatch({ type: "SET_USER", payload: undefined });
    history.push("/session/new");
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { text: "Logged out successfully", status: "success" },
    });
  };
};
