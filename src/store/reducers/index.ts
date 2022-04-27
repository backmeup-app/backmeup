import { TUserAction, userReducer } from ".";
import { combineReducers } from "../../utilities";

export type TAppAction = TUserAction;

export const stateReducer = combineReducers({ userReducer });

export * from "./user";
