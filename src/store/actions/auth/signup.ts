import { useContext, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import { TAppAction } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { client } from "../client";
import Cookies from "universal-cookie";
import { TSignupResponse, TSignupVariables } from "./types";

export const useSignup = () => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const history = useHistory();

  return async (variables: TSignupVariables) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_NETWORK_OPERATION", payload: "user.signup" });
    const cookies = new Cookies();

    try {
      const {
        data: { user, token },
      } = await client().post<TSignupResponse>("/me", { ...variables });
      const tokenExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      cookies.set("token", token, { expires: tokenExpiry });
      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_NETWORK_OPERATION", payload: "" });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          status: "success",
          text: `Welcome ${variables.first_name} ${variables.last_name}!`,
        },
      });
      history.push("/resources");
    } catch (error) {}
  };
};
