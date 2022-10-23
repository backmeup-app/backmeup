import { TBackupAction, TMultipleBackupAction, TSingleBackupAction } from ".";
import { TResource, TService } from "../..";
import { TAppState } from "../../../contexts";

export const getBackups = (
  state: TAppState,
  payload: TBackupAction["payload"]
) => {
  const { me } = state;
  const { backups, hasMoreBackups, resource_uuid } =
    payload as TMultipleBackupAction;

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
  resource.hasMoreBackups = hasMoreBackups;

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

export const deleteBackup = (
  state: TAppState,
  payload: TBackupAction["payload"]
) => {
  const { me } = state;
  const { resource_uuid, ...deletedBackup } = payload as TSingleBackupAction;

  const services = me?.services as TService[];
  const index = services.findIndex(
    (service) => service._id.toString() === me?.default_service?.toString()
  );

  const defaultService = services[index];
  const resourceIndex = (defaultService.resources ?? []).findIndex(
    (resource) => resource.uuid === resource_uuid
  );

  const resource = (defaultService.resources ?? [])[resourceIndex];
  resource.backups = resource?.backups?.filter(
    (backup) => backup?.uuid !== deletedBackup?.uuid
  );

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
