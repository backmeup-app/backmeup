import { TBackup } from "../..";

export type TOptionalBackupPayload = {
  resource_uuid?: string;
};

export type TMultipleBackupAction = TOptionalBackupPayload & {
  backups: TBackup[];
  hasMoreBackups: boolean;
};

export type TSingleBackupAction = TOptionalBackupPayload & TBackup;

export type TBackupAction = {
  type: "GET_BACKUPS" | "DELETE_BACKUP";
  payload: TSingleBackupAction | TMultipleBackupAction;
};
