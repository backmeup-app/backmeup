import {
  TAppReducerAction,
  appReducer,
  TResourceAction,
  resourceReducer,
  TServiceAction,
  serviceReducer,
  TUserAction,
  userReducer,
} from ".";
import { combineReducers } from "../../utilities";

export type TAppAction =
  | TAppReducerAction
  | TResourceAction
  | TServiceAction
  | TUserAction;

export const stateReducer = combineReducers({
  appReducer,
  resourceReducer,
  serviceReducer,
  userReducer,
});

export * from "./app";
export * from "./resource";
export * from "./service";
export * from "./user";
