import { TApiKey } from "../..";

export type TApiKeyAction = {
  type: "CREATE_API_KEY" | "DELETE_API_KEY";
  payload: TApiKey;
};
