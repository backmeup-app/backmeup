import { TService } from ".";

export type TUser = {
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  services?: TService[];
};
