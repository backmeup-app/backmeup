import { FC, useContext, Dispatch } from "react";
import { VStack, Flex, Text, chakra, useDisclosure } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { TServices } from "./types";
import { TAppAction, useUpdateUser } from "../../../../store";
import { AppContext, TAppState } from "../../../../contexts";
import { EditService } from "../../..";

export const Services: FC<TServices> = ({ showServices, setShowServices }) => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateUser = useUpdateUser();
  const CheckIcon = chakra(BsCheckCircle);

  return (
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
      <EditService isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
