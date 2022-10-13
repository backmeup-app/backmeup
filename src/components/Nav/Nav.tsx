import { useContext, useState, useRef, Dispatch, useMemo } from "react";
import {
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  Box,
  chakra,
} from "@chakra-ui/react";
import { useOutsideClick, useDisclosure } from "@chakra-ui/hooks";
import { AiOutlineDown } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction, TService, useUpdateUser } from "../../store";
import { EditService } from "..";

export const Nav = () => {
  const [{ me, browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.services, me?.default_service]);
  const [showServices, setShowServices] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const CaretDown = chakra(AiOutlineDown);
  const ArrowDown = chakra(IoMdArrowDropdown);
  const CheckIcon = chakra(BsCheckCircle);
  const updateUser = useUpdateUser();

  useOutsideClick({
    ref: servicesRef,
    handler: () => setShowServices(false),
  });

  const Services = () => (
    <VStack
      pos="absolute"
      left={0}
      w="220px"
      top="155%"
      bg="white"
      boxShadow="sm"
      fontSize="15px"
      spacing={3}
      borderRadius={"2spx"}
      opacity={showServices ? 1 : 0}
      zIndex={showServices ? 5 : -9999}
      transition="all 5s ease-in"
      py={3}
    >
      <Flex px={4} justifyContent="flex-start" w="100%">
        <Text>Your services</Text>
      </Flex>
      {me?.services?.map((service, index) => {
        const isDefaultService = service._id === me?.default_service;
        return (
          <Flex
            key={index}
            px={4}
            alignItems="center"
            justifyContent="flex-start"
            w="100%"
            onClick={
              !isDefaultService
                ? async () =>
                    await updateUser({ default_service: service.uuid })
                : () => {}
            }
          >
            <CheckIcon
              mr={3}
              color="copper.300"
              visibility={isDefaultService ? "visible" : "hidden"}
            />
            <Text>{service?.name}</Text>
          </Flex>
        );
      })}
      <Flex
        onClick={() => {
          onOpen();
          setShowServices(false);
        }}
        px={4}
        alignItems="center"
        justifyContent="flex-start"
        w="100%"
      >
        <CheckIcon mr={3} visibility="hidden" />
        <Text>Create Service</Text>
      </Flex>
    </VStack>
  );

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
        <Services />
      </Box>
      <HStack align="center" spacing={3} cursor="pointer">
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
      </HStack>
      <EditService isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
