import { TBackup } from "..";

export type TResource = {
  _id: string;
  uuid: string;
  name: string;
  description?: string;
  backups?: TBackup[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  isSingle?: boolean;
};
