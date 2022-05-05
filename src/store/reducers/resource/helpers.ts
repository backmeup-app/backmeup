import {
  TMultipleResourcePayload,
  TResourceAction,
  TSingleResourcePayload,
} from ".";
import { TResource, TService } from "../..";
import { TAppState } from "../../../contexts";

export const getResources = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services as TService[];
  const { pagination, resources } = payload as TMultipleResourcePayload;
  const idx = services.findIndex(
    (service) => service.uuid === (payload.service_uuid as string)
  );

  if (idx === -1) return state;
  const service = services[idx];
  if (pagination.currentPage > 1)
    service.resources = ((service.resources as TResource[]) ?? []).concat(
      resources
    );
  else service.resources = resources;

  service.resourcePagination = pagination;
  services[idx] = service;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const createResource = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services as TService[];
  const { service_uuid, ...createdResource } =
    payload as TSingleResourcePayload;
  const idx = services.findIndex(
    (service) => service.uuid === (service_uuid as string)
  );

  if (idx === -1) return state;
  const service = services[idx];
  (service.resources ?? []).unshift(createdResource);

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const updateResource = (
  state: TAppState,
  payload: TResourceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services as TService[];
  const { service_uuid, ...updatedResource } =
    payload as TSingleResourcePayload;
  const idx = services.findIndex(
    (service) => service.uuid === (service_uuid as string)
  );

  if (idx === -1) return state;
  const service = services[idx];
  const resources = service?.resources as TResource[];
  const resourceIdx = resources.findIndex(
    (resource) => resource._id === updatedResource._id
  );

  if (resourceIdx === -1) return state;

  resources[resourceIdx] = updatedResource;
  service.resources = resources;
  services[idx] = service;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};
