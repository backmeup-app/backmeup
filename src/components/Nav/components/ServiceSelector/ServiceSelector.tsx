import { useContext, useState, useRef, useMemo, Dispatch } from "react";
import {
  VStack,
  Flex,
  Avatar,
  HStack,
  Box,
  Text,
  chakra,
  Spinner,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { TAppAction, TService, useUpdateUser } from "../../../../store";
import { AppContext, TAppState } from "../../../../contexts";
import { EditService } from "../../..";

export const ServiceSelector = () => {
  const [{ me, networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const [showServices, setShowServices] = useState(false);
  const updateUser = useUpdateUser();
  const CheckIcon = chakra(BsCheckCircle);
  const ArrowDown = chakra(IoMdArrowDropdown);

  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.services, me?.default_service]);

  useOutsideClick({
    ref: servicesRef,
    handler: () => setShowServices(false),
  });

  const toggleServices = () => setShowServices(!showServices);

  const ListServices = () => (
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
              color="darkgoldenrod"
              visibility={isDefaultService ? "visible" : "hidden"}
            />
            <Text>{service?.name}</Text>
            <Spinner
              size="xs"
              ml={2}
              visibility={
                networkOperation === `update.default.service.${service?.uuid}`
                  ? "visible"
                  : "hidden"
              }
            />
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
      <EditService isOpen={isOpen} onClose={onClose} />
    </VStack>
  );

  return (
    <Box pos="relative" ref={servicesRef} cursor="pointer" alignItems="center">
      {defaultService?.uuid ? (
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
            boxSize="9"
          />
          <Text fontSize={{ base: "0.95rem" }}>{defaultService?.name}</Text>
          <ArrowDown mt="2px" fontSize="xl" />
        </HStack>
      ) : (
        <Text fontFamily="oswald">DOME</Text>
      )}
      <ListServices />
    </Box>
  );
};
