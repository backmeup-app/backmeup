import { TApiKey } from "../..";
import { TCommonApiResponse } from "../types";

export type TCreateApiKeyVariables = {
  name: string;
};

export type TDeleteApiKeyVariables = {
  uuid: string;
};

export type TCreateApiKeyResponse = TCommonApiResponse & {
  apiKey: TApiKey;
};
