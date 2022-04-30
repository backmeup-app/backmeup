import { FC } from "react";
import { InputGroup, Input } from "@chakra-ui/react";
import { TCustomTextInput } from "./types";

export const CustomTextInput: FC<TCustomTextInput> = ({
  rightAddOn,
  leftAddOn,
  rightElement,
  leftElement,
  ...props
}) => {
  return (
    <InputGroup>
      <Input {...props} />
    </InputGroup>
  );
};
