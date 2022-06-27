import { TUser } from "../..";
import { TCommonApiResponse } from "../types";

export type TVerifyGoogleAuth = TCommonApiResponse & {
  user: TUser;
  token: string;
};

export type TResetEmailVariables = {
  password: string;
};

export type TChangeEmailVariables = {
  token: string;
};

export type TChangeEmailInitialVariables = TChangeEmailVariables & {
  email: string;
};
