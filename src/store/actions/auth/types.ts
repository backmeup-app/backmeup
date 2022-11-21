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

export type TLoginVariables = Pick<TSignupVariables, "email" | "password">;

export type TLoginResponse = TSignupResponse;

export type TVerifyGoogleAuth = TSignupResponse;
