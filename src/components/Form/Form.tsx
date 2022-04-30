import { FC } from "react";
import { SimpleGrid, Button, GridItem } from "@chakra-ui/react";
import { TForm } from "./types";
import { FormControl } from "./FormControl";

export const Form: FC<TForm> = ({
  controls,
  onSubmit,
  submitBtnText = "Save",
}) => {
  const displayControls = () =>
    controls.map((control, index) => <FormControl key={index} {...control} />);

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <SimpleGrid as="form" onSubmit={handleSubmit} columns={12}>
      {displayControls()}
      <GridItem colSpan={12} mt={2}>
        <Button w="100%">{submitBtnText}</Button>
      </GridItem>
    </SimpleGrid>
  );
};
