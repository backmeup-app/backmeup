import { TResource } from ".";
import { TPagination } from "../../contexts";

export type TService = {
  _id: string;
  uuid: string;
  name: string;
  description?: string;
  backup_duration: "1w" | "1m" | "3m";
  created_at: string;
  updated_at: string;
  resources?: TResource[];
  resourcePagination?: TPagination;
};
