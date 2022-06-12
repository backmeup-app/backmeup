import { TNotification } from "../..";

export type TNotificationAction = {
  type: "UPDATE_NOTIFICATION";
  payload: TNotification;
};
