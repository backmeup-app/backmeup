import { TAppReducerAction, appReducer, TUserAction, userReducer } from ".";
import { combineReducers } from "../../utilities";

export type TAppAction = TAppReducerAction | TUserAction;

export const stateReducer = combineReducers({ appReducer, userReducer });

export * from "./app";
export * from "./user";
