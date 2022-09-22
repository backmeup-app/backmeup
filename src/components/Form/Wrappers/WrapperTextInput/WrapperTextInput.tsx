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
      <Input
        {...props}
        isInvalid={props.isInvalid}
        focusBorderColor={props.isInvalid ? "red.500" : "unset"}
        css={{
          "&:focus": {
            // borderWidth: props.isInvalid ? "1px" : "2.2px",
          },
        }}
        borderRadius="4px"
      />
      {rightElement && <InputRightElement {...rightElement} />}
    </InputGroup>
  );
};
