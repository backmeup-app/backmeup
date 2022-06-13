import { useContext, useEffect, useCallback, useState } from "react";
import { Flex, Text, chakra } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { AppContext } from "../../contexts";

export const SuccessIcon = chakra(BsCheckCircle);
export const ErrorIcon = chakra(FaRegTimesCircle);

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
        return <SuccessIcon color="white" size={19} />;
      case "error":
        return <ErrorIcon color="white" size={19} />;
      default:
        return <SuccessIcon color="white" size={19} />;
    }
  }, [notification?.status]);

  const SuccessIcon = chakra(BsCheckCircle);
  const ErrorIcon = chakra(FaRegTimesCircle);

  return (
    <Flex
      pos="fixed"
      align="center"
      right={6}
      bottom={6}
      p={5}
      bg={
        notification?.status === "success"
          ? "rgb(85,85,85)"
          : notification?.status === "error"
          ? "red.400"
          : "blue"
      }
      opacity={display ? 1 : 0}
      boxShadow="md"
      transition="all 0.5s ease-in"
    >
      {displayStatus()}
      <Text ml={3} fontSize="15px" color="white">
        {notification?.text ?? ""}
      </Text>
    </Flex>
  );
};
