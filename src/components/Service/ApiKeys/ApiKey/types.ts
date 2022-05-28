import { TApiKey } from "../../../../store";

export type TApiKeyComponent = Omit<TApiKey, "key"> & {
  value: string;
};
