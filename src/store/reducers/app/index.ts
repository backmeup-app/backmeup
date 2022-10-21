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
    case "SET_BROWSER_WIDTH":
      return { ...state, browserWidth: action.payload };
    case "SET_ON_SCROLL":
      return { ...state, onScroll: action.payload };
    default:
      return state;
  }
};
