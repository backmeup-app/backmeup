import { TIpAddress } from "../..";
import { TCommonApiResponse } from "../types";

export type TCreateIpAddressVariables = {
  value: string;
};
export type TCreateIpAddressResponse = TCommonApiResponse & {
  ip: TIpAddress;
};
