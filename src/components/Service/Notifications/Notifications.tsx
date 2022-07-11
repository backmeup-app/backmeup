import { useContext, Dispatch, useMemo } from "react";
import { Box, VStack, Flex, Text, Switch } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService, useUpdateNotifications } from "../../../store";
import { events } from "./helpers";

export const ServiceNotifications = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return (me?.services as TService[]).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);
  const updateNotifications = useUpdateNotifications();
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
      const isChecked = Boolean(defaultService?.notifications?.events[key]);
      return (
        <Flex
          key={index}
          px={6}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          textTransform="uppercase"
        >
          <Box>
            <Text fontSize="15px" mb={3}>
              {name}
            </Text>
            <Text fontSize="13px">ERROR ID - {key}</Text>
          </Box>
          <Switch
            isChecked={isChecked}
            onChange={() => {
              updateNotifications({
                key: "event." + key.toLowerCase(),
                value: !isChecked,
              });
            }}
            colorScheme="green"
          />
        </Flex>
      );
    });

  return (
    <VStack spacing={6}>
      <Box bg="white" shadow="md" w="100%">
        <Box {...headerStyleProps}>
          <Text textAlign="left">Notification Channels</Text>
        </Box>
        <VStack spacing={5} py={5}>
          {displayChannels()}
        </VStack>
      </Box>
      <Box bg="white" shadow="md" w="100%">
        <Box {...headerStyleProps}>
          <Text textAlign="left">Notification Alerts</Text>
        </Box>
        <VStack spacing={8} py={8}>
          {displayEvents()}
        </VStack>
      </Box>
    </VStack>
  );
};
