import { FC } from "react";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { TWrapperRadioGroup } from "./types";

export const WrapperRadioGroup: FC<TWrapperRadioGroup> = ({
  direction = "row",
  name,
  onChange,
  value,
  options,
}) => {
  const displayOptions = () =>
    options.map(({ label, value }, index) => (
      <Radio key={index} value={value}>
        {label}
      </Radio>
    ));

  return (
    <RadioGroup
      name={name}
      onChange={onChange}
      value={value}
      colorScheme="copper"
    >
      <Stack direction={{ base: "column", sm: direction }} spacing={4}>
        {displayOptions()}
      </Stack>
    </RadioGroup>
  );
};
