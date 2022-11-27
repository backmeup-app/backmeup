import { TService } from "../..";
import { TCommonApiResponse } from "../types";

export type TCreateServiceVariables = {
  name: string;
  description?: string;
  backup_duration?: string;
};

export type TUpdateServiceVariables = Partial<TCreateServiceVariables> & {
  auth_enabled?: boolean;
  ip_whitelist_enabled?: boolean;
};

export type TEditServiceResponse = TCommonApiResponse & {
  service: TService;
};
