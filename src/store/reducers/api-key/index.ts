import { TAppState } from "../../../contexts";
import { TApiKeyAction } from ".";
import { createApiKey } from "./helpers";

export * from "./types";

export const apiKeyReducer = (state: TAppState, action: TApiKeyAction) => {
  switch (action.type) {
    case "CREATE_API_KEY":
      return createApiKey(state, action.payload);
    default:
      return state;
  }
};
