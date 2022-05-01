import { FC, useContext, FormEvent } from "react";
import { SimpleGrid, Button, GridItem } from "@chakra-ui/react";
import { TForm } from "./types";
import { FormControl } from "./FormControl";
import { AppContext } from "../../contexts";

export const Form: FC<TForm> = ({
  controls,
  onSubmit,
  submitBtnText = "Save",
}) => {
  const [{ loading }] = useContext(AppContext);

  const displayControls = () =>
    controls.map((control, index) => <FormControl key={index} {...control} />);

  const handleSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <SimpleGrid as="form" onSubmit={handleSubmit} columns={12}>
      {displayControls()}
      <GridItem colSpan={12} mt={2}>
        <Button
          type="submit"
          w="100%"
          isLoading={loading}
          loadingText={submitBtnText}
        >
          {submitBtnText}
        </Button>
      </GridItem>
    </SimpleGrid>
  );
};
