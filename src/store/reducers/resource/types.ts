import { TResource } from "../..";
import { TPagination } from "../../../contexts";

export type TOptionalResourceAction = {
  service_uuid?: string;
};

export type TSingleResourcePayload = TOptionalResourceAction & TResource;
export type TMultipleResourcePayload = TOptionalResourceAction & {
  pagination: TPagination;
  resources: TResource[];
};

export type TResourceAction = {
  type:
    | "CREATE_RESOURCE"
    | "UPDATE_RESOURCE"
    | "DELETE_RESOURCE"
    | "GET_RESOURCES"
    | "DELETE_RESOURCE";
  payload: TSingleResourcePayload | TMultipleResourcePayload;
};
