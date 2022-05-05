import { TextareaProps, SwitchProps } from "@chakra-ui/react";
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

export type TSwitch = {
  type: "switch";
  properties: SwitchProps & TCommonFormControlProps;
};

export type TFormControl = TTextInput | TTextarea | TSwitch;
