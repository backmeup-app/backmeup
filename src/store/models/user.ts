import { TService } from ".";

export type TUser = {
  _id: string;
  uuid: string;
  first_name: string;
  last_name: string;
  auth_type: string;
  email: string;
  email_verification_token: string | undefined;
  avatar: string;
  default_service: string | undefined;
  created_at: string;
  updated_at: string;
  services: TService[];
};
