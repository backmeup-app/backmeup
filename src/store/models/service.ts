import { TResource } from ".";

export type TService = {
  _id: string;
  uuid: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  resources?: TResource[];
};
