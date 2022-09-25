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
        focusBorderColor={"#D2D7E5"}
        errorBorderColor="red.300"
        css={{
          "&:focus": {
            borderWidth: "2px",
          },
        }}
        borderRadius="4px"
      />
      {rightElement && <InputRightElement {...rightElement} />}
    </InputGroup>
  );
};
