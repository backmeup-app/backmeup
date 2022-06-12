import { useContext, Dispatch } from "react";
import { Box, VStack, Flex, Text, Switch } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const Notifications = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
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
    {
      name: "Telegram",
      value: "Fambegbe Olamileke",
    },
  ];

  const events = [
    "backup requests are made with wrong credentials",
    "backup requests are made from unauthorized IPs",
    "backup requests are successful",
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
          <Text fontSize="sm" mb={2}>
            {channel.name}
          </Text>
          <Text fontSize="14px">{channel.value}</Text>
        </Box>
        <Switch colorScheme="green" />
      </Flex>
    ));

  const displayEvents = () =>
    events.map((event, index) => (
      <Flex key={index} px={6} w="100%" justifyContent="space-between">
        <Text fontSize="15px">{event}</Text>
        <Switch colorScheme="green" />
      </Flex>
    ));

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
          <Text textAlign="left">Receive notifications when</Text>
        </Box>
        <VStack spacing={8} py={8}>
          {displayEvents()}
        </VStack>
      </Box>
    </VStack>
  );
};
