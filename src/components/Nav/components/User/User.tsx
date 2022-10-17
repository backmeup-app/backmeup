import { useContext, Dispatch, useRef, useState } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  chakra,
  useOutsideClick,
} from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import { AppContext, TAppState } from "../../../../contexts";
import { TAppAction } from "../../../../store";

export const User = () => {
  const [{ me, browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const CaretDown = chakra(AiOutlineDown);

  useOutsideClick({
    ref: optionsRef,
    handler: () => setShowOptions(false),
  });

  const toggleOptions = () => setShowOptions(!showOptions);

  const Options = () => (
    <Box
      pos="absolute"
      left="-6px"
      w="100%"
      top="160%"
      bg="white"
      boxShadow="sm"
      opacity={showOptions ? 1 : 0}
      zIndex={showOptions ? 5 : -9999}
      transition="all 5s ease-in"
    >
      <VStack
        spacing={1}
        align="flex-start"
        borderBottom="1px solid"
        borderBottomColor="rgba(0,0,0,0.06)"
        px={4}
        py={3}
      >
        <Text fontSize="14px">{me?.first_name + " " + me?.last_name}</Text>
        <Text fontSize="12.5px">{me?.email}</Text>
      </VStack>
      <Box px={4} py={3} fontSize="14px">
        Logout
      </Box>
    </Box>
  );

  return (
    <HStack
      ref={optionsRef}
      align="center"
      spacing={3}
      cursor="pointer"
      pos="relative"
    >
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
      <Options />
    </HStack>
  );
};
