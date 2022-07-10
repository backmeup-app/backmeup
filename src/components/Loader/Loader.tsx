import { Flex, Spinner } from "@chakra-ui/react";
export const Loader = () => {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Spinner size="lg" />
    </Flex>
  );
};
