import { useContext, useState, useRef, Dispatch } from "react";
import {
  Stack,
  Box,
  Flex,
  Text,
  chakra,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";
import { Modal } from "../..";
import { EmailPassword } from "./EmailPassword";
import { Google } from "./Google";

export const Auth = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const [showOptions, setShowOptions] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const ArrowDown = chakra(AiOutlineDown);
  const GoogleIcon = chakra(FcGoogle);
  const isEmailPassword = me?.auth_type === "PASSWORD";

  useOutsideClick({
    ref: optionsRef,
    handler: () => setShowOptions(false),
  });

  const AuthOptions = () => (
    <Box
      bg="white"
      shadow="sm"
      pos="absolute"
      top="calc(100% + 8px)"
      minWidth="250px"
      right={{ sm: 0 }}
      left={{ base: 0, sm: "unset" }}
      py={2}
      onClick={onOpen}
    >
      {isEmailPassword ? (
        <Flex align="center" px={5} py={2} cursor="pointer">
          <GoogleIcon mr={3} />
          <Text fontSize="13.5px">Use Google</Text>
        </Flex>
      ) : (
        <Flex align="center" px={5} py={2} cursor="pointer">
          <Text fontSize="13.5px">Use Email and Password</Text>
        </Flex>
      )}
    </Box>
  );

  const AuthSelector = () => (
    <Box
      border="1px solid"
      px={3}
      py={2}
      d="flex"
      alignItems="center"
      pos="relative"
      ref={optionsRef}
      onClick={() => {
        setShowOptions(!showOptions);
      }}
    >
      <Text mr={2} fontSize="15px">
        Change
      </Text>
      <ArrowDown fontSize="sm" pos="relative" top="1px" />
      {showOptions && <AuthOptions />}
    </Box>
  );

  return (
    <Box w="100%" ref={optionsRef}>
      <Stack
        bg="white"
        w="100%"
        p={{ base: 6, sm: 8, md: 10 }}
        boxShadow="sm"
        alignItems={{ base: "flex-start", sm: "center" }}
        justify="space-between"
        direction={{ base: "column", sm: "row" }}
      >
        <Text fontWeight="bold" mb={{ base: 3, sm: 0 }}>
          Sign-in method
        </Text>
        <Box
          w="60%"
          d="flex"
          alignItems={{ base: "flex-start", sm: "center" }}
          justifyContent="space-between"
          cursor="pointer"
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Box
            pos="relative"
            borderBottom="3px solid"
            borderBottomColor="charlestonGreen"
            mb={{ base: 7, sm: 0 }}
          >
            <Text>{isEmailPassword ? "Email/Password" : "Google"}</Text>
            <Box
              as="span"
              pos="absolute"
              bottom="-6px"
              width="100%"
              h="3px"
              bg="navajoWhite"
            />
          </Box>
          <AuthSelector />
        </Box>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          isEmailPassword ? "Use Google Sign-in" : "Email and Password Sign-in"
        }
      >
        {isEmailPassword ? (
          <Google isOpen={isOpen} onClose={onClose} />
        ) : (
          <EmailPassword isOpen={isOpen} onClose={onClose} />
        )}
      </Modal>
    </Box>
  );
};
