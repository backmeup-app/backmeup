import { TService } from ".";

export type TUser = {
  _id: string;
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  default_service: string | undefined;
  created_at: string;
  updated_at: string;
  services: TService[];
};
