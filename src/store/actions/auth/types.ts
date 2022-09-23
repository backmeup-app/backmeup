import { TUser } from "../..";
import { TCommonApiResponse } from "../types";

export type TSignupVariables = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type TSignupResponse = TCommonApiResponse & {
  user: TUser;
  token: string;
};

export type TVerifyGoogleAuth = TSignupResponse;

export type TResetEmailVariables = {
  password: string;
};

export type TChangeEmailVariables = {
  token: string;
};

export type TChangeEmailInitialVariables = TChangeEmailVariables & {
  email: string;
};
