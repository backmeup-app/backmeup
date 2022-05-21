import { TService } from "../..";
import { TCommonApiResponse } from "../types";

export type TCreateServiceVariables = {
  name: string;
  description?: string;
  backup_duration?: string;
};

export type TUpdateServiceVariables = Partial<TCreateServiceVariables>;

export type TEditServiceResponse = TCommonApiResponse & {
  service: TService;
};
