import { TApiKey, TIpAddress, TNotification, TResource } from ".";

export type TService = {
  _id: string;
  uuid: string;
  name: string;
  description?: string;
  backup_duration: "1w" | "1m" | "3m";
  created_at: string;
  updated_at: string;
  hasMoreResources?: boolean;
  api_keys: TApiKey[];
  ips: TIpAddress[];
  notifications: TNotification;
  resources?: TResource[];
};
