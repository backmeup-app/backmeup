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
  const isRequired = styleProps?.isRequired ?? false;
  delete styleProps?.isRequired;

  const displayControl = () => {
    const properties: any = props;
    switch (type) {
      case "text":
        return <WrapperTextInput {...properties} />;
      case "textarea":
        return <Textarea {...properties} />;
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
    <GridItem {...styleProps}>
      <ChakraFormControl
        isInvalid={Boolean(errorMessage)}
        isRequired={isRequired}
      >
        {label && label}
        {displayControl()}
        {helperText && helperText}
        {errorMessage && errorMessage}
      </ChakraFormControl>
    </GridItem>
  );
};
