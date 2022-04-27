import { TAppState } from "../../../contexts";
import { TUserAction } from "./types";

export * from "./types";

export const userReducer = (state: TAppState, action: TUserAction) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        me: action.payload,
      };
    default:
      return state;
  }
};
