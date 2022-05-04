import { TAppState } from "../../../contexts";
import { getResources } from "./helpers";
import { TResourceAction } from "./types";

export * from "./types";

export const resourceReducer = (state: TAppState, action: TResourceAction) => {
  switch (action.type) {
    case "GET_RESOURCES":
      return getResources(state, action.payload);
    default:
      return state;
  }
};
