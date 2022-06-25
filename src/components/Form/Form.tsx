import { FC, useContext, FormEvent } from "react";
import { SimpleGrid, Button, GridItem } from "@chakra-ui/react";
import { TForm } from "./types";
import { FormControl } from "./FormControl";
import { AppContext } from "../../contexts";

export const Form: FC<TForm> = ({
  controls,
  onSubmit,
  networkOperation,
  submitBtnText = "Save",
  classNames,
}) => {
  const [{ loading, networkOperation: networkOperationCtxt }] =
    useContext(AppContext);

  const displayControls = () =>
    controls.map((control, index) => <FormControl key={index} {...control} />);

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const isLoading = !networkOperation
    ? loading
    : loading && networkOperation === networkOperationCtxt;

  return (
    <SimpleGrid as="form" onSubmit={handleSubmit} columnGap={5} columns={12}>
      {displayControls()}
      <GridItem colSpan={12} mt={2} {...(classNames?.buttonParent ?? {})}>
        <Button
          type="submit"
          w="100%"
          isLoading={isLoading}
          loadingText={submitBtnText}
        >
          {submitBtnText}
        </Button>
      </GridItem>
    </SimpleGrid>
  );
};
