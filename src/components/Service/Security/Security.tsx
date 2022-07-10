import { VStack } from "@chakra-ui/react";
import { ApiKeys } from "..";
import { Ips } from "../Ips";

export const Security = () => {
  return (
    <VStack spacing="24px">
      <ApiKeys />
      <Ips />
    </VStack>
  );
};
