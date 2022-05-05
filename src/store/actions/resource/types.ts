import { TResource } from "../..";
import { TPagination } from "../../../contexts";
import { TCommonApiResponse } from "../types";

export type TGetResources = TCommonApiResponse & {
  resources: TResource[];
  pagination: TPagination;
};

export type TEditResourceVariables = Partial<
  Pick<TResource, "name" | "description" | "is_active">
>;

export type TEditResourceResponse = TCommonApiResponse & {
  resource: TResource;
};
