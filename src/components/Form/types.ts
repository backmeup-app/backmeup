import { TFormControl } from "./FormControl";

export type TForm = {
  controls: TFormControl[];
  onSubmit: () => void;
  submitBtnText?: string;
  networkOperation?: string;
  classNames?: { [key: string]: any };
};
