import { TAppState } from "../../../contexts";
import { TAppReducerAction } from "./types";

export * from "./types";

export const appReducer = (state: TAppState, action: TAppReducerAction) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    case "SET_NETWORK_OPERATION":
      return { ...state, networkOperation: action.payload };
    default:
      return state;
  }
};
