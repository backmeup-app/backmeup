import { TUser } from "../..";
import { TCommonApiResponse } from "../types";

export type TUpdateUserVariables = Partial<
  Pick<TUser, "first_name" | "last_name" | "default_service">
> & {
  avatar?: File;
};

export type TResetUserPasswordInitialVariables = {
  email: string;
};

export type TUpdateUserPasswordVariables = {
  password: string;
};

export type TUpdateUserResponse = TCommonApiResponse & {
  user: TUser;
};

export type TGetUser = TCommonApiResponse & {
  user: TUser;
};
