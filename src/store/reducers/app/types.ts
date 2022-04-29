import { TAppNotification } from "../../../contexts";

export type TAppReducerAction = {
  type: "SET_LOADING" | "SET_NOTIFICATION";
  payload: boolean | TAppNotification;
};
