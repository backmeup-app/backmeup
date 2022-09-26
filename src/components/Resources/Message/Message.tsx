import { useContext, useMemo } from "react";
import { Flex, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditResource } from "../..";
import { AppContext } from "../../../contexts";
import { TService } from "../../../store";
import { capitalize } from "../../../utilities";

export const ResourceMessage = () => {
  const [{ me }] = useContext(AppContext);

  const defaultService: TService = useMemo(() => {
    return (me?.services ?? []).find(
      (service) => service._id.toString() === (me?.default_service as string)
    ) as TService;
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      w="100%"
      h="calc(100vh - 190px)"
      dir="column"
      align="center"
      justify="center"
    >
      <VStack spacing={5} w="50%" pos="relative" top="-5%">
        <Image
          boxSize={20}
          src="https://res.cloudinary.com/olamileke/image/upload/v1651325548/backmeup/startup-rocket_zrhku3.svg"
        />
        <Heading fontSize="2xl" textTransform="capitalize">
          No resources exist for{" "}
          {capitalize(defaultService ? defaultService.name : "")}
        </Heading>
        <Text fontSize={"md"} textAlign="center" lineHeight="tall">
          Create your first resource by clicking the button below.
        </Text>
        <Button variant="primary" size="sm" onClick={onOpen}>
          Create Resource
        </Button>
      </VStack>
      <EditResource isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
