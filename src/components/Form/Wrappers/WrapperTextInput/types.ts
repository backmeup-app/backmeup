import {
  InputProps,
  InputAddonProps,
  InputElementProps,
} from "@chakra-ui/input";

export type TWrapperTextInput = InputProps & {
  rightAddOn?: InputAddonProps;
  leftAddOn?: InputAddonProps;
  rightElement?: InputElementProps;
  leftElement?: InputElementProps;
};
