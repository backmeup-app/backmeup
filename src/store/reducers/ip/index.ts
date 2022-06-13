import { TAppState } from "../../../contexts";
import { createIpAddress, deleteIpAddress } from "./helpers";
import { TIpAction } from "./types";

export * from "./types";

export const ipAddressReducer = (state: TAppState, action: TIpAction) => {
  switch (action.type) {
    case "CREATE_IP_ADDRESS":
      return createIpAddress(state, action.payload);
    case "DELETE_IP_ADDRESS":
      return deleteIpAddress(state, action.payload);
    default:
      return state;
  }
};
