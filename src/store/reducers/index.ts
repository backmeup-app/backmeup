import { TLoadingAction, loadingReducer, TUserAction, userReducer } from ".";
import { combineReducers } from "../../utilities";

export type TAppAction = TLoadingAction | TUserAction;

export const stateReducer = combineReducers({ loadingReducer, userReducer });

export * from "./loading";
export * from "./user";
