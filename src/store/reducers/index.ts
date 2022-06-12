import {
  TAppReducerAction,
  appReducer,
  TApiKeyAction,
  apiKeyReducer,
  TIpAction,
  ipAddressReducer,
  notificationReducer,
  TNotificationAction,
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
  | TNotificationAction
  | TResourceAction
  | TServiceAction
  | TUserAction;

export const stateReducer = combineReducers({
  apiKeyReducer,
  appReducer,
  ipAddressReducer,
  notificationReducer,
  resourceReducer,
  serviceReducer,
  userReducer,
});

export * from "./api-key";
export * from "./app";
export * from "./ip";
export * from "./notification";
export * from "./resource";
export * from "./service";
export * from "./user";
