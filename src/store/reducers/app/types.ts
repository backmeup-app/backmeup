import { TAppNotification } from "../../../contexts";

export type TAppReducerAction = {
  type: "SET_LOADING" | "SET_NOTIFICATION" | "SET_NETWORK_OPERATION";
  payload: boolean | TAppNotification | string;
};
