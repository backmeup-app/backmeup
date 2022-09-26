import { useContext, Dispatch, useMemo } from "react";
import { Box, VStack, Flex, Text, Switch } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService, useUpdateNotifications } from "../../../store";
import { events } from "./helpers";

export const ServiceNotifications = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
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
        direction={{ base: "column-reverse", md: "row" }}
        justifyContent={{ md: "space-between" }}
        alignItems={{ base: "flex-start", md: "center" }}
      >
        <Box>
          <Text fontSize="md" mb={{ base: 1, md: 2 }}>
            {channel.name}
          </Text>
          <Text fontSize={{ base: "16px", md: "15px" }}>{channel.value}</Text>
        </Box>
        <Switch isChecked={true} colorScheme="green" mb={{ base: 3, md: 0 }} />
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
          direction={{ base: "column-reverse", md: "row" }}
          justifyContent={{ md: "space-between" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Text fontSize="15.7px">{name}</Text>
          <Switch
            isChecked={isChecked}
            onChange={() => {
              updateNotifications({
                key: "event." + key.toLowerCase(),
                value: !isChecked,
              });
            }}
            mb={{ base: 3, md: 0 }}
            colorScheme="green"
          />
        </Flex>
      );
    });

  return (
    <VStack spacing={6}>
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
          <Text textAlign="left">Alerts</Text>
        </Box>
        <VStack spacing={{ base: 6, md: 8 }} py={8}>
          {displayEvents()}
        </VStack>
      </Box>
    </VStack>
  );
};
