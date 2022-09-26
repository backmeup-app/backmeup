import { TAppState } from "../../../contexts";
import { TUserAction } from "./types";

export * from "./types";

export const userReducer = (state: TAppState, action: TUserAction) => {
  switch (action.type) {
    case "SET_USER":
    case "UPDATE_USER":
      return {
        ...state,
        me: { ...state.me, ...action.payload },
      };
    default:
      return state;
  }
};
