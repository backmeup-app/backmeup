import { useContext, Dispatch } from "react";
import { Flex, Text, HStack, Avatar, chakra } from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction } from "../../store";
import { User, ServiceSelector } from "./components";

export const Nav = () => {
  const [{ me, browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const CaretDown = chakra(AiOutlineDown);

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
      <HStack align="center" spacing={3} cursor="pointer" pos="relative">
        <Avatar
          size="sm"
          src={me?.avatar}
          boxSize={10}
          bg="navajowhite"
          color="charlestonGreen"
          name={me?.first_name + " " + me?.last_name}
        />
        {(browserWidth ?? window.innerWidth) > 480 && (
          <Text fontSize="15px" ml={1}>
            {me?.first_name + " " + me?.last_name}
          </Text>
        )}
        <CaretDown boxSize="14px" color="gray.600" pos="relative" top="2px" />
        <User />
      </HStack>
    </Flex>
  );
};
