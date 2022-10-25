import { useContext, Dispatch, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  GridItem,
  VStack,
  Image,
  Heading,
  Button,
  chakra,
} from "@chakra-ui/react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";

export const Message = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const history = useHistory();
  const { resource_uuid } = useParams<{ resource_uuid: string }>();
  const ArrowBack = chakra(IoArrowBackCircleOutline);

  const resource = useMemo(() => {
    const service = me?.services?.find(
      (service) => service?._id?.toString() === me?.default_service?.toString()
    ) as TService;

    return service?.resources?.find(
      (resource) => resource.uuid === resource_uuid
    );
  }, []);

  return (
    <GridItem
      colSpan={12}
      w="100%"
      h="calc(100vh - 250px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={6} w="100%" pos="relative" top="-10.5%">
        <Image
          boxSize={28}
          src="https://res.cloudinary.com/olamileke/image/upload/v1666402968/backmeup/assets/states/bouncy-folder-icon_pepkvh.png"
          objectFit="contain"
          position="relative"
          top="5px"
        />
        <Heading
          fontFamily="openSans"
          fontSize={{ base: "1.2rem", sm: "1.3rem" }}
          textTransform="capitalize"
          textAlign="center"
          lineHeight="tall"
        >
          No backups have been made for {resource?.name} yet
        </Heading>
        <Button
          onClick={() => {
            history.push("/resources");
          }}
          position="relative"
          top="2px"
        >
          <ArrowBack mr={1} fontSize="xl" /> Resources
        </Button>
      </VStack>
    </GridItem>
  );
};
