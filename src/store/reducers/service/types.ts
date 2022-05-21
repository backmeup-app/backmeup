import { TService } from "../..";

export type TServiceAction = {
  type: "CREATE_SERVICE" | "UPDATE_SERVICE" | "DELETE_SERVICE";
  payload: TService;
};
