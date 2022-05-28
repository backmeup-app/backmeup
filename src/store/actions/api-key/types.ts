import { TApiKey } from "../..";
import { TCommonApiResponse } from "../types";

export type TCreateApiKeyVariables = {
  name: string;
};

export type TCreateApiKeyResponse = TCommonApiResponse & {
  apiKey: TApiKey;
};
