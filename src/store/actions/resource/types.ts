import { TResource } from "../..";
import { TCommonApiResponse } from "../types";

export type TGetResources = TCommonApiResponse & {
  resources: TResource[];
  hasMoreResources: boolean;
};

export type TGetResourceResponse = TCommonApiResponse & {
  resource: TResource;
};

export type TEditResourceVariables = Partial<
  Pick<TResource, "name" | "description" | "is_active">
>;

export type TEditResourceResponse = TCommonApiResponse & {
  resource: TResource;
};
