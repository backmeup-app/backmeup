import { useContext, useEffect, useCallback, useState } from "react";
import { Flex, Text, chakra } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { AppContext } from "../../contexts";

export const Notification = () => {
  const [{ notification }] = useContext(AppContext);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const pause = async () => {
      await new Promise((res) => setTimeout(res, 3000));
      setDisplay(false);
    };
    if (!notification) return;
    setDisplay(true);
    pause();
  }, [notification]);

  const displayStatus = useCallback(() => {
    switch (notification?.status) {
      case "success":
        return <SuccessIcon color="green.300" size={19} />;
      case "error":
        return <ErrorIcon color="red.900" size={19} />;
      default:
        return <ErrorIcon color="red.400" size={19} />;
    }
  }, [notification?.status]);

  const displayBorderColor = useCallback(() => {
    switch (notification?.status) {
      case "success":
        return "green.300";
      case "error":
        return "red.400";
      default:
        return "red.400";
    }
  }, [notification?.status]);

  const SuccessIcon = chakra(BsCheckCircle);
  const ErrorIcon = chakra(FaRegTimesCircle);

  return (
    <Flex
      pos="fixed"
      align="center"
      left={6}
      bottom={6}
      p={6}
      bg="rgba(0,0,0,0.7)"
      color="white"
      opacity={display ? 1 : 0}
      boxShadow="md"
      border="1px solid"
      borderColor={displayBorderColor()}
      transition="all 0.5s ease-in"
    >
      <Text mr={3} color="white">
        {notification?.text ?? "Authenticated successfully"}
      </Text>
      {displayStatus()}
    </Flex>
  );
};
