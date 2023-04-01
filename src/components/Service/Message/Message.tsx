import { useContext, Dispatch } from "react";
import { Flex, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditService, Nav } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";

export const Message = () => {
  const [{ browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex w="100vw" h="100vh" flexDirection="column" align="center">
      <Nav />
      <VStack
        spacing={6}
        w={{ base: "88%", sm: "75%", lg: "50%" }}
        h="calc(90vh - 90px)"
        justify="center"
      >
        <Image
          boxSize={{ base: 16, sm: 20 }}
          src="https://res.cloudinary.com/olamileke/image/upload/v1679754220/dome/assets/gello/startup-rocket_xzuujx.svg"
        />
        <Heading fontFamily="openSans" fontSize={{ base: "xl", sm: "2xl" }}>
          Create Your First Service
        </Heading>
        <Text
          fontSize={{ base: "0.95rem", sm: "1.05rem" }}
          textAlign="center"
          lineHeight={1.8}
        >
          Get up and running with Dome by creating your first service. Services
          are the core components of Dome and enable you to logically group the
          different resources which you intend to create backups for.
        </Text>
        <Button
          onClick={onOpen}
          size={browserWidth && browserWidth > 480 ? "md" : "sm"}
        >
          Create Service
        </Button>
      </VStack>
      <EditService isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
