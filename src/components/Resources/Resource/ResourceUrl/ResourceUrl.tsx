import { FC, useContext, Dispatch } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";
import { TResourceUrl } from "./types";
import { Modal } from "../../..";
import { capitalize } from "../../../../utilities";
import { AppContext, TAppState } from "../../../../contexts";
import { TAppAction } from "../../../../store";

export const ResourceUrl: FC<TResourceUrl> = ({
  name,
  uuid,
  isOpen,
  onClose,
}) => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  const handleCopy = () => {
    const url = "https://duran.olamileke.me/" + uuid;
    navigator.clipboard.writeText(url);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { status: "success", text: "Copied to clipboard" },
    });
  };

  // const handleCreateApiKey = () => {
  //   const anchor = document.createElement("a");
  //   anchor.target = "_blank";
  //   const location = document.location;
  //   anchor.href = "https:" + "//" + location.host + "settings";
  //   anchor.click();
  // };

  return (
    <Modal
      title={`${capitalize(name)}'s Unique Backup URL`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <VStack spacing={5} alignItems="flex-start" w="100%">
        <Text
          bg="#f5f8fa"
          p={5}
          boxShadow="sm"
          fontSize="sm"
          lineHeight="taller"
        >
          Note: Make your backup requests for {capitalize(name)} to the below
          URL. Remember that backup requests require two things. A valid API key
          for the service specified as the Authorization header and the intended
          file to be backed up for {capitalize(name)}.
        </Text>

        <Text
          p={5}
          textAlign="center"
          w="100%"
          bg="#FBFBFB"
          boxShadow="sm"
          fontSize="sm"
        >
          https://duran.olamileke.me/{uuid}
        </Text>

        <Text
          w="100%"
          fontSize="sm"
          textAlign="center"
          textDecoration="underline"
          cursor="pointer"
          onClick={handleCopy}
        >
          Copy
        </Text>
        <Button w="100%" onClick={onClose}>
          Close
        </Button>
      </VStack>
    </Modal>
  );
};
