import { TResource } from "../..";
import { TPagination } from "../../../contexts";
import { TCommonApiResponse } from "../types";

export type TGetResources = TCommonApiResponse & {
  resources: TResource[];
  pagination: TPagination;
};

export type TUpdateResourceVariables = Partial<
  Pick<TResource, "name" | "description" | "is_active">
>;

export type TUpdateResourceResponse = TCommonApiResponse & {
  resource: TResource;
};
