import { TUser } from "../..";
import { TCommonApiResponse } from "../types";

export type TUpdateUserVariables = {
  name?: string;
  email?: string;
  avatar?: string;
  default_service?: string;
};

export type TUpdateUserResponse = TCommonApiResponse & {
  user: TUser;
};

export type TGetUser = TCommonApiResponse & {
  user: TUser;
};
