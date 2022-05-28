import {
  TAppReducerAction,
  appReducer,
  TApiKeyAction,
  apiKeyReducer,
  TResourceAction,
  resourceReducer,
  TServiceAction,
  serviceReducer,
  TUserAction,
  userReducer,
} from ".";
import { combineReducers } from "../../utilities";

export type TAppAction =
  | TApiKeyAction
  | TAppReducerAction
  | TResourceAction
  | TServiceAction
  | TUserAction;

export const stateReducer = combineReducers({
  apiKeyReducer,
  appReducer,
  resourceReducer,
  serviceReducer,
  userReducer,
});

export * from "./api-key";
export * from "./app";
export * from "./resource";
export * from "./service";
export * from "./user";
