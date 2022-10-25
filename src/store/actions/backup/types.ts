import { TBackup } from "../..";
import { TCommonApiResponse } from "../types";

export type TGetBackupsResponse = TCommonApiResponse & {
  backups: TBackup[];
  hasMoreBackups: boolean;
};
