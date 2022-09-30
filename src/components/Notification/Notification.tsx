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
      await new Promise((res) => setTimeout(res, 6500));
      setDisplay(false);
    };
    if (!notification) return;
    setDisplay(true);
    pause();
  }, [notification]);

  const displayStatus = useCallback(() => {
    switch (notification?.status) {
      case "success":
        return <SuccessIcon flexShrink={0} color="white" size={19} />;
      case "error":
        return <ErrorIcon flexShrink={0} color="white" size={19} />;
      default:
        return <SuccessIcon flexShrink={0} color="white" size={19} />;
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
      maxWidth={{ base: "80vw", sm: "300px" }}
      p={5}
      bg={
        notification?.status === "success"
          ? "green.400"
          : notification?.status === "error"
          ? "red.400"
          : "green.400"
      }
      opacity={display ? 1 : 0}
      boxShadow="md"
      transition="opacity 0.5s ease-in"
      zIndex={display ? 9999 : -9999}
      cursor="pointer"
      onClick={() => {
        setDisplay(false);
      }}
    >
      {displayStatus()}
      <Text ml={4} fontSize="15px" color="white">
        {notification?.text ??
          "We have sent a password reset link to olamileke.f@gmail.com"}
      </Text>
    </Flex>
  );
};
