import { useContext, Dispatch, useMemo } from "react";
import { Box, VStack, Flex, Text, Switch } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { events } from "./helpers";

export const Notifications = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return (me?.services as TService[]).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);
  const headerStyleProps = {
    py: 4,
    px: 6,
    w: "100%",
    borderBottom: "1px solid",
    borderBottomColor: "gray.100",
  };

  const channels = [
    {
      name: "Email",
      value: me?.email as string,
    },
  ];

  const displayChannels = () =>
    channels.map((channel, index) => (
      <Flex
        key={index}
        px={6}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Text fontSize="md" mb={2}>
            {channel.name}
          </Text>
          <Text fontSize="15px">{channel.value}</Text>
        </Box>
        <Switch isChecked={true} colorScheme="green" />
      </Flex>
    ));

  const displayEvents = () =>
    events.map(({ name, key }, index) => {
      return (
        <Flex key={index} px={6} w="100%" justifyContent="space-between">
          <Text fontSize="15.5px">{name}</Text>
          <Switch
            isChecked={defaultService?.notifications?.events[key]}
            colorScheme="green"
          />
        </Flex>
      );
    });

  return (
    <VStack spacing={6} mx={10}>
      <Box bg="white" shadow="md" w="100%">
        <Box {...headerStyleProps}>
          <Text textAlign="left">Channels</Text>
        </Box>
        <VStack spacing={5} py={5}>
          {displayChannels()}
        </VStack>
      </Box>
      <Box bg="white" shadow="md" w="100%">
        <Box {...headerStyleProps}>
          <Text textAlign="left">Get notified when</Text>
        </Box>
        <VStack spacing={8} py={8}>
          {displayEvents()}
        </VStack>
      </Box>
    </VStack>
  );
};
