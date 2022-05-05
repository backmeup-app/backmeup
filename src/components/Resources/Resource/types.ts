import { TResource } from "../../../store";

export type TResourceComponent = TResource & {
  edit: (uuid: string) => void;
};
