import { FC, useContext, Dispatch } from "react";
import {
  VStack,
  Box,
  Text,
  Button,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { TResourceUrl } from "./types";
import { Modal } from "../../..";
import { capitalize } from "../../../../utilities";
import { AppContext, TAppState } from "../../../../contexts";
import { TAppAction } from "../../../../store";
import { Accordion } from "../../..";

export const ResourceUrl: FC<TResourceUrl> = ({
  name,
  uuid,
  isOpen,
  onClose,
}) => {
  const [, dispatch] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  const handleCopy = () => {
    const url = uuid + ".usedo.me";
    navigator.clipboard.writeText(url);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { status: "success", text: "Copied to clipboard" },
    });
  };

  const Instruction = () => (
    <AccordionPanel
      bg="#f5f8fa"
      p={5}
      boxShadow="sm"
      fontSize="sm"
      lineHeight="taller"
      mt={4}
      mb={2}
    >
      <Text mb={3}>
        Note: Make your backup requests for {capitalize(name)} to the below URL.
        Remember that the request body requires two parameters. The intended
        file to back up (backup) and its file format (format).
      </Text>

      <Text>
        Dont forget to include a valid Authorization header in the format Bearer
        - {"Api Key"} if you have authentication enabled for the service.
      </Text>
    </AccordionPanel>
  );

  return (
    <Modal
      title={`${capitalize(name)}'s Unique Backup URL`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <VStack spacing={5} alignItems="flex-start" w="100%">
        <Accordion
          width="100%"
          items={[
            {
              heading: (
                <AccordionButton p={0} justifyContent="center">
                  <Text mr={2}>View Instructions</Text>
                  <AccordionIcon />
                </AccordionButton>
              ),
              content: <Instruction />,
            },
          ]}
        />
        <Text
          p={{ base: 3, sm: 5 }}
          textAlign="center"
          w="100%"
          bg="#FBFBFB"
          boxShadow="sm"
          fontSize="sm"
        >
          {uuid}.usedo.me
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
