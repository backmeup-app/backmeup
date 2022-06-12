import { TAppState } from "../../../contexts";
import { updateNotification } from "./helpers";
import { TNotificationAction } from "./types";

export * from "./types";

export const notificationReducer = (
  state: TAppState,
  action: TNotificationAction
) => {
  switch (action.type) {
    case "UPDATE_NOTIFICATION":
      return updateNotification(state, action.payload);
    default:
      return state;
  }
};
