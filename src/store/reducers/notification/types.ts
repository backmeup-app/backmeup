import { TNotification } from "../..";

export type TNotificationAction = {
  type: "UPDATE_SERVICE_NOTIFICATION";
  payload: TNotification;
};
