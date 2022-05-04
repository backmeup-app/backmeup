import { TResource } from "../..";
import { TPagination } from "../../../contexts";
import { TCommonApiResponse } from "../types";

export type TGetResources = TCommonApiResponse & {
  resources: TResource[];
  pagination: TPagination;
};
