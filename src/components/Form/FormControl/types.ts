import { TextareaProps } from "@chakra-ui/textarea";
import { TCustomTextInput } from "../Custom";

export type TCommonFormControlProps = {
  label?: JSX.Element;
  helperText?: JSX.Element;
  errorMessage?: JSX.Element;
  styleProps: any;
};

export type TTextInput = {
  type: "text";
  properties: TCustomTextInput & TCommonFormControlProps;
};

export type TTextarea = {
  type: "textarea";
  properties: TextareaProps & TCommonFormControlProps;
};

export type TFormControl = TTextInput | TTextarea;
