import { useContext, Dispatch } from "react";
import {
  VStack,
  HStack,
  Box,
  Flex,
  Text,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";
import { Modal } from "../..";
import { EmailPassword } from "./EmailPassword";
import { Google } from "./Google";

export const Auth = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ArrowDown = chakra(AiOutlineDown);
  const EmailIcon = chakra(SiGmail);
  const GoogleIcon = chakra(FcGoogle);
  const isEmailPassword = me?.auth_type === "PASSWORD";

  const AuthOptions = () => (
    <Box
      bg="white"
      shadow="md"
      pos="absolute"
      top="calc(100% + 8px)"
      minWidth="250px"
      right="0"
      py={2}
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
    >
      <Text mr={2} fontSize="15px">
        Change
      </Text>
      <ArrowDown fontSize="sm" pos="relative" top="1px" />
      <AuthOptions />
    </Box>
  );

  return (
    <VStack w="100%">
      <HStack
        bg="white"
        w="100%"
        p={{ base: 6, sm: 8, md: 10 }}
        boxShadow="sm"
        alignItems="center"
        justify="space-between"
        mb={20}
      >
        <Text fontWeight="bold">Sign-in method</Text>
        <Box
          w="70%"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          cursor="pointer"
          onClick={onOpen}
        >
          {isEmailPassword ? (
            <Text d="flex" alignItems="center">
              <EmailIcon mr={2} /> Email and Password
            </Text>
          ) : (
            <Text>Google</Text>
          )}
          <AuthSelector />
        </Box>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          isEmailPassword ? "Use Google Sign-in" : "Email and Password Sign-in"
        }
      >
        {isEmailPassword ? <Google /> : <EmailPassword />}
      </Modal>
    </VStack>
  );
};
