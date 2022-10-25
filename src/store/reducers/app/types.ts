import { TAppNotification } from "../../../contexts";

export type TAppReducerAction = {
  type:
    | "SET_LOADING"
    | "SET_NOTIFICATION"
    | "SET_NETWORK_OPERATION"
    | "SET_BROWSER_WIDTH"
    | "SET_ON_SCROLL";
  payload:
    | string
    | number
    | boolean
    | TAppNotification
    | (() => void)
    | undefined;
};
