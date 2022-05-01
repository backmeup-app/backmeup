import { TService } from "../..";

export type TServiceAction = {
  type: "CREATE_SERVICE" | "DELETE_SERVICE";
  payload: TService;
};
