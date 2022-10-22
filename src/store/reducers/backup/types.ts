import { TBackup } from "../..";

export type TOptionalBackupPayload = {
  resource_uuid?: string;
};

export type TMultipleBackupAction = TOptionalBackupPayload & {
  backups: TBackup[];
  hasMoreBackups: boolean;
};

export type TBackupAction = {
  type: "GET_BACKUPS";
  payload: TMultipleBackupAction;
};
