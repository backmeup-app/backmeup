import { TUser } from "../..";

export type TUserAction = {
  type: "SET_USER";
  payload: TUser;
};
