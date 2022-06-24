import { TUser } from "../..";

export type TUserAction = {
  type: "SET_USER";
  payload: Pick<
    TUser,
    "first_name" | "last_name" | "email" | "avatar" | "default_service"
  >;
};
