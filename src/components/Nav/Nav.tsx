import { useContext, useState, useRef, Dispatch, useMemo } from "react";
import { Flex, Text, HStack, Avatar, Box, chakra } from "@chakra-ui/react";
import { useOutsideClick } from "@chakra-ui/hooks";
import { AiOutlineDown } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction, TService } from "../../store";
import { Options, Services } from "./components";

export const Nav = () => {
  const [{ me, browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.services, me?.default_service]);
  const [showServices, setShowServices] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const CaretDown = chakra(AiOutlineDown);
  const ArrowDown = chakra(IoMdArrowDropdown);

  useOutsideClick({
    ref: servicesRef,
    handler: () => setShowServices(false),
  });

  const toggleServices = () => setShowServices(!showServices);

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
      <Box
        pos="relative"
        ref={servicesRef}
        cursor="pointer"
        alignItems="center"
      >
        <HStack
          onClick={toggleServices}
          spacing={4}
          visibility={defaultService?.uuid ? "visible" : "hidden"}
        >
          <Avatar
            size="sm"
            borderRadius="none"
            bg="navajowhite"
            color="charlestonGreen"
            name={defaultService?.name}
            boxSize="10"
          />
          <Text>{defaultService?.name}</Text>
          <ArrowDown mt="2px" fontSize="xl" />
        </HStack>
        <Services
          showServices={showServices}
          setShowServices={setShowServices}
        />
      </Box>
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
        <Options />
      </HStack>
    </Flex>
  );
};
