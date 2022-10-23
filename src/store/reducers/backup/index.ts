import { TAppState } from "../../../contexts";
import { deleteBackup, getBackups } from "./helpers";
import { TBackupAction } from "./types";

export * from "./types";

export const backupReducer = (state: TAppState, action: TBackupAction) => {
  switch (action.type) {
    case "GET_BACKUPS":
      return getBackups(state, action.payload);
    case "DELETE_BACKUP":
      return deleteBackup(state, action.payload);
    default:
      return state;
  }
};
