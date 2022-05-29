import { TIpAddress } from "../..";

export type TIpAction = {
  type: "CREATE_IP_ADDRESS";
  payload: TIpAddress;
};
