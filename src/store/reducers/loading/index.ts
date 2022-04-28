import { TAppState } from "../../../contexts";
import { TLoadingAction } from "./types";

export * from "./types";

export const loadingReducer = (state: TAppState, action: TLoadingAction) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
  }
};
