import { FC } from "react";
import {
  FormControl as ChakraFormControl,
  GridItem,
  Textarea,
  Switch,
} from "@chakra-ui/react";
import { TFormControl } from ".";
import { WrapperRadioGroup, WrapperTextInput } from "../Wrappers";

export const FormControl: FC<TFormControl> = ({ type, properties }) => {
  const { label, helperText, errorMessage, styleProps, ...props } = properties;
  const { isRequired, ...gridItemProps } = styleProps;

  const displayControl = () => {
    const properties: any = props;
    switch (type) {
      case "text":
        return (
          <WrapperTextInput {...properties} isInvalid={Boolean(errorMessage)} />
        );
      case "textarea":
        return (
          <Textarea
            {...properties}
            css={{
              "&:focus": {
                borderWidth: "3px",
                borderColor: "#D2D7E5 !important",
              },
            }}
            borderRadius="4px"
          />
        );
      case "switch":
        return (
          <Switch
            {...properties}
            colorScheme="green"
            isChecked={properties.value}
          />
        );
      case "radiogroup":
        return <WrapperRadioGroup {...properties} />;
      default:
        return <div />;
    }
  };

  return (
    <GridItem {...gridItemProps}>
      <ChakraFormControl
        isInvalid={Boolean(errorMessage)}
        isRequired={Boolean(isRequired)}
      >
        {label ? label : undefined}
        {displayControl()}
        {helperText && helperText}
        {errorMessage && errorMessage}
      </ChakraFormControl>
    </GridItem>
  );
};
