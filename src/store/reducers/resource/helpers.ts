import { TMultipleResourcePayload, TResourceAction } from ".";
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
