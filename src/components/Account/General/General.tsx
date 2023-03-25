import { useContext, Dispatch, useRef } from "react";
import { useFormik } from "formik";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";
import { Form } from "../../";
import { useGeneralConfig, useGeneralControls } from "./controls";

export const General = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const getGeneralConfig = useGeneralConfig();
  const generalFormik = useFormik(getGeneralConfig());
  const getGeneralControls = useGeneralControls();
  const generalControls = getGeneralControls(generalFormik);

  return (
    <Box w="100%">
      <Flex mb={5} alignItems="flex-end">
        <Image
          src={me?.avatar}
          alt={me?.first_name ?? "" + " " + me?.last_name}
          ref={imageRef}
          w={{ base: "90px", sm: "100px", md: "120px" }}
          h={{ base: "90px", sm: "100px", md: "120px" }}
          border="4px solid"
          borderColor="white"
          mr={4}
        />
        <Text as="u" fontSize="sm" cursor="pointer" color="gray.700">
          Change Avatar
        </Text>
        <input type="file" ref={fileRef} accept="image/*" hidden />
      </Flex>
      <Box
        w="100%"
        boxShadow="sm"
        bgColor="white"
        p={{ base: 6, sm: 8, md: 10 }}
      >
        <Form
          controls={generalControls}
          onSubmit={generalFormik.handleSubmit}
          submitBtnText="Update"
          classNames={{
            buttonParent: {
              colSpan: { base: 12, md: 6 },
              mt: { base: 2, md: 8 },
            },
          }}
          networkOperation="update.user"
        />
      </Box>
    </Box>
  );
};
