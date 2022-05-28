import { TAppState } from "../../../contexts";
import { TApiKeyAction } from ".";
import { createApiKey, deleteApiKey } from "./helpers";

export * from "./types";

export const apiKeyReducer = (state: TAppState, action: TApiKeyAction) => {
  switch (action.type) {
    case "CREATE_API_KEY":
      return createApiKey(state, action.payload);
    case "DELETE_API_KEY":
      return deleteApiKey(state, action.payload);
    default:
      return state;
  }
};
