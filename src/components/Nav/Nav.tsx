import { Flex } from "@chakra-ui/react";
import { User, ServiceSelector } from "./components";

export const Nav = () => {
  return (
    <Flex
      bg="white"
      boxShadow="sm"
      alignItems="center"
      justify="space-between"
      py={6}
      px={{ base: 8, sm: 12, lg: 20 }}
      w="100%"
    >
      <ServiceSelector />
      <User />
    </Flex>
  );
};
