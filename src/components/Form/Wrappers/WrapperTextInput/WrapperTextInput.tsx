import { FC, useContext, Dispatch } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { TWrapperTextInput } from "./types";
import { AppContext, TAppState } from "../../../../contexts";
import { TAppAction } from "../../../../store";

export const WrapperTextInput: FC<TWrapperTextInput> = ({
  rightAddOn,
  leftAddOn,
  rightElement,
  leftElement,
  ...props
}) => {
  const [{ browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

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
        size={browserWidth && browserWidth > 480 ? "lg" : "md"}
        fontSize={{ base: "0.95rem", sm: "md" }}
      />
      {rightElement && <InputRightElement {...rightElement} />}
    </InputGroup>
  );
};
