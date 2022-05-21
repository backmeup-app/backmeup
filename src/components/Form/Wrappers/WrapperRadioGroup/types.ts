export type TWrapperRadioGroup = {
  direction?: "row" | "column";
  name: string;
  value?: string;
  onChange: any;
  options: TRadio[];
};

type TRadio = {
  label: string;
  value: string;
};
