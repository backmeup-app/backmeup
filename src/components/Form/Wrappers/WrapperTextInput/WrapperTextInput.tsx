import { FC } from "react";
import { InputGroup, Input } from "@chakra-ui/react";
import { TWrapperTextInput } from "./types";

export const WrapperTextInput: FC<TWrapperTextInput> = ({
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
