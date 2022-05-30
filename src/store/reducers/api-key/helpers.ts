import { TApiKeyAction } from ".";
import { TService } from "../..";
import { TAppState } from "../../../contexts";

export const createApiKey = (
  state: TAppState,
  payload: TApiKeyAction["payload"]
) => {
  const { me } = state;
  const services = me?.services as TService[];
  const idx = services.findIndex(
    (service) => service._id.toString() === (me?.default_service as string)
  );

  if (idx === -1) return state;

  const defaultService = services[idx];
  defaultService.api_keys = [payload, ...(defaultService.api_keys ?? [])];
  services[idx] = defaultService;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const deleteApiKey = (
  state: TAppState,
  payload: TApiKeyAction["payload"]
) => {
  const { me } = state;
  const services = me?.services as TService[];
  const idx = services.findIndex(
    (service) => service._id.toString() === (me?.default_service as string)
  );

  if (idx === -1) return state;

  const defaultService = services[idx];
  defaultService.api_keys = (defaultService.api_keys ?? []).filter(
    (key) => key.uuid !== payload.uuid
  );
  services[idx] = defaultService;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};
