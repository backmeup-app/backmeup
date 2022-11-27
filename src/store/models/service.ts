import { TApiKey, TIpAddress, TNotification, TResource } from ".";

export type TServiceAuth = {
  is_enabled: boolean;
  api_keys: TApiKey[];
};

export type TServiceIpWhitelist = {
  is_enabled: boolean;
  ips: TIpAddress[];
};

export type TService = {
  _id: string;
  uuid: string;
  name: string;
  description?: string;
  backup_duration: "1w" | "1m" | "3m";
  created_at: string;
  updated_at: string;
  hasMoreResources?: boolean;
  auth: TServiceAuth;
  ip_whitelist: TServiceIpWhitelist;
  notifications: TNotification;
  resources?: TResource[];
};
