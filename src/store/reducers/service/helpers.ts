import { TAppState } from "../../../contexts";
import { TServiceAction } from "./types";

export const updateService = (
  state: TAppState,
  payload: TServiceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const idx = services.findIndex((service) => service.uuid === payload.uuid);

  if (idx === -1) return state;

  services[idx] = payload;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};

export const deleteService = (
  state: TAppState,
  payload: TServiceAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const idx = services.findIndex((service) => service.uuid === payload.uuid);

  if (idx === -1) return state;

  services.splice(idx, 1);

  return {
    ...state,
    me: {
      ...state.me,
      default_service: services.length > 0 ? services[0]._id : undefined,
      services,
    },
  };
};
