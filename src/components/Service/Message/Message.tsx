import { Flex, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditService } from "../..";

export const Message = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex w="100vw" h="100vh" dir="column" align="center" justify="center">
      <VStack
        spacing={5}
        w={{ base: "88%", sm: "75%", lg: "50%" }}
        pos="relative"
        top="-5%"
      >
        <Image
          boxSize={20}
          src="https://res.cloudinary.com/olamileke/image/upload/v1651325548/backmeup/startup-rocket_zrhku3.svg"
        />
        <Heading fontSize={["2xl", "3xl"]}>Create Your First Service</Heading>
        <Text
          fontSize={["17px", "md"]}
          textAlign="center"
          lineHeight={["taller", "tall"]}
        >
          Get up and running with Backmeup by creating your first service.
          Services are the core components of Backmeup and enable you to
          logically group the different resources which you intend to create
          backups for.
        </Text>
        <Button variant="primary" onClick={onOpen}>
          Create Service
        </Button>
      </VStack>
      <EditService isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
