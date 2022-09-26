import { TAppState } from "../../../contexts";
import { TNotificationAction } from "./types";

export const updateNotification = (
  state: TAppState,
  payload: TNotificationAction["payload"]
) => {
  const { me } = state;
  const services = me?.services ?? [];
  const idx = services.findIndex(
    (service) => service._id.toString() === (me?.default_service as string)
  );

  if (idx === -1) return state;

  const defaultService = services[idx];
  defaultService.notifications = payload;
  services[idx] = defaultService;

  return {
    ...state,
    me: {
      ...state.me,
      services,
    },
  };
};
