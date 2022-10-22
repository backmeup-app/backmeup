import { TResource } from "../..";

export type TOptionalResourceAction = {
  service_uuid?: string;
};

export type TSingleResourcePayload = TOptionalResourceAction & TResource;
export type TMultipleResourcePayload = TOptionalResourceAction & {
  resources: TResource[];
  hasMoreResources: boolean;
};

export type TResourceAction = {
  type:
    | "CREATE_RESOURCE"
    | "UPDATE_RESOURCE"
    | "DELETE_RESOURCE"
    | "GET_RESOURCES"
    | "GET_RESOURCE"
    | "DELETE_RESOURCE";
  payload: TSingleResourcePayload | TMultipleResourcePayload;
};
