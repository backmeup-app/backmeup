import { TAppState } from "../../../contexts";
import { getResources, updateResource } from "./helpers";
import { TResourceAction } from "./types";

export * from "./types";

export const resourceReducer = (state: TAppState, action: TResourceAction) => {
  switch (action.type) {
    case "UPDATE_RESOURCE":
      return updateResource(state, action.payload);
    case "GET_RESOURCES":
      return getResources(state, action.payload);
    default:
      return state;
  }
};
