import {
  TAppReducerAction,
  appReducer,
  TApiKeyAction,
  apiKeyReducer,
  TIpAction,
  ipAddressReducer,
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
  | TIpAction
  | TResourceAction
  | TServiceAction
  | TUserAction;

export const stateReducer = combineReducers({
  apiKeyReducer,
  appReducer,
  ipAddressReducer,
  resourceReducer,
  serviceReducer,
  userReducer,
});

export * from "./api-key";
export * from "./app";
export * from "./ip";
export * from "./resource";
export * from "./service";
export * from "./user";
