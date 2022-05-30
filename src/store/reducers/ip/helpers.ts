import { TIpAction } from ".";
import { TService } from "../..";
import { TAppState } from "../../../contexts";

export const createIpAddress = (
  state: TAppState,
  payload: TIpAction["payload"]
) => {
  const { me } = state;
  const services = me?.services as TService[];
  const idx = services.findIndex(
    (service) => service._id.toString() === (me?.default_service as string)
  );

  if (idx === -1) return state;

  const defaultService = services[idx];
  defaultService.ips = [payload, ...(defaultService.ips ?? [])];

  services[idx] = defaultService;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};
