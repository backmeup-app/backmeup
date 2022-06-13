import { TNotification } from "../..";
import { TCommonApiResponse } from "../types";

export type TUpdateNotificationsVariables = {
  key: string;
  value: boolean;
};

export type TUpdateNotificationsResponse = TCommonApiResponse & {
  notifications: TNotification;
};
