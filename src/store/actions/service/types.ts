import { TService } from "../..";
import { TCommonApiResponse } from "../types";

export type TCreateServiceVariables = {
  name: string;
  description?: string;
};

export type TCreateServiceResponse = TCommonApiResponse & {
  service: TService;
};
