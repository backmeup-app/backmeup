import { TBackupAction, TMultipleBackupAction } from ".";
import { TResource, TService } from "../..";
import { TAppState } from "../../../contexts";

export const getBackups = (
  state: TAppState,
  payload: TBackupAction["payload"]
) => {
  const { me } = state;
  const { backups, resource_uuid } = payload as TMultipleBackupAction;

  const services = me?.services as TService[];
  const index = services.findIndex(
    (service) => service._id.toString() === me?.default_service?.toString()
  );

  const defaultService = services[index];
  const resourceIndex = (defaultService.resources ?? []).findIndex(
    (resource) => resource.uuid === resource_uuid
  );

  const resource = (defaultService.resources ?? [])[resourceIndex];
  resource.backups = [...(resource?.backups ?? []), ...backups];

  defaultService.resources = defaultService.resources as TResource[];
  defaultService.resources[resourceIndex] = resource;

  services[index] = defaultService;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};
