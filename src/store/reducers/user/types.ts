import { TUser } from "../..";

export type TUserAction = {
  type: "SET_USER";
  payload: Pick<TUser, "name" | "email" | "avatar" | "default_service">;
};
