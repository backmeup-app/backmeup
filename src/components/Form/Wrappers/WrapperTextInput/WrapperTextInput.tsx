import { FC } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
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
      {leftElement && <InputLeftElement {...leftElement} />}
      <Input {...props} />
      {rightElement && <InputRightElement {...rightElement} />}
    </InputGroup>
  );
};
