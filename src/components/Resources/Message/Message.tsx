import { useContext, useMemo } from "react";
import { Flex, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditResource } from "../..";
import { AppContext } from "../../../contexts";
import { TService } from "../../../store";
import { capitalize } from "../../../utilities";

export const ResourceMessage = () => {
  const [{ me, browserWidth }] = useContext(AppContext);

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
      <VStack
        spacing={5}
        w={{ base: "85%", sm: "50%" }}
        pos="relative"
        top="-6.5%"
      >
        <Image
          boxSize={32}
          src="https://res.cloudinary.com/olamileke/image/upload/v1672058337/dome/assets/gello/sammy-1_coxm0q.png"
          objectFit="contain"
          pos="relative"
          top="30px"
        />
        <Heading
          fontFamily="openSans"
          fontSize={{ base: "1.05rem", sm: "1.35rem" }}
          textTransform="capitalize"
          textAlign="center"
        >
          No resources exist for{" "}
          {capitalize(defaultService ? defaultService.name : "")}
        </Heading>
        <Text
          fontSize={{ base: "0.95rem", sm: "md" }}
          textAlign="center"
          lineHeight="tall"
        >
          Create your first resource by clicking the button below.
        </Text>
        <Button
          variant="primary"
          onClick={onOpen}
          size={browserWidth && browserWidth > 480 ? "md" : "sm"}
        >
          Create Resource
        </Button>
      </VStack>
      <EditResource isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
