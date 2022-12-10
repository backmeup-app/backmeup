import { TUser } from "../..";

type TSetUser = Pick<
  TUser,
  "first_name" | "last_name" | "email" | "avatar" | "default_service"
>;

export type TUserAction = {
  type: "SET_USER" | "UPDATE_USER";
  payload: TSetUser | Partial<TSetUser> | undefined;
};
