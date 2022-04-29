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
        return <ErrorIcon />;
      default:
        return <ErrorIcon />;
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
      bg="rgba(0,0,0,0.15)"
      color="white"
      opacity={display ? 1 : 0}
      transition="all 0.5s ease-in"
    >
      <Text mr={3}>{notification?.text}</Text>
      {displayStatus()}
    </Flex>
  );
};
