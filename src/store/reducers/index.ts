import {
  TAppReducerAction,
  appReducer,
  TServiceAction,
  serviceReducer,
  TUserAction,
  userReducer,
} from ".";
import { combineReducers } from "../../utilities";

export type TAppAction = TAppReducerAction | TServiceAction | TUserAction;

export const stateReducer = combineReducers({
  appReducer,
  serviceReducer,
  userReducer,
});

export * from "./app";
export * from "./service";
export * from "./user";
