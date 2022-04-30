import { TUser } from "../..";
import { TCommonApiResponse } from "../types";

export type TGetUser = TCommonApiResponse & {
  user: TUser;
};
