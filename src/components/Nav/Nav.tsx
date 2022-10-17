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
      <User />
    </Flex>
  );
};
