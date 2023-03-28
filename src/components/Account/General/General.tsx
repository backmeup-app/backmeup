import { useContext, Dispatch, useRef } from "react";
import { useFormik } from "formik";
import { Box, Avatar, Flex, chakra } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction } from "../../../store";
import { Form } from "../../";
import { useGeneralConfig, useGeneralControls } from "./controls";
import { BiImageAdd } from "react-icons/bi";
import { useParseAvatar } from "./helpers";

export const General = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const CameraIcon = chakra(BiImageAdd);

  const getGeneralConfig = useGeneralConfig();
  const generalFormik = useFormik(getGeneralConfig());
  const getGeneralControls = useGeneralControls();
  const generalControls = getGeneralControls(generalFormik);
  const parseAvatar = useParseAvatar(generalFormik);

  const triggerAvatarSelection = () => {
    if (!fileRef.current) return;

    fileRef.current.click();
  };

  return (
    <Box w="100%">
      <Flex
        mb={5}
        alignItems="flex-end"
        position="relative"
        width="fit-content"
        cursor="pointer"
        onClick={triggerAvatarSelection}
      >
        <Avatar
          className="avatar"
          src={
            me?.avatar ?? "https://mauii.xyz/images/auth-home/DefaultAvatar.png"
          }
          bg="navajowhite"
          color="charlestonGreen"
          ref={imageRef}
          w={{ base: "90px", sm: "100px", md: "120px" }}
          h={{ base: "90px", sm: "100px", md: "120px" }}
          borderRadius="none"
          border="3px solid white"
        />
        <input
          type="file"
          ref={fileRef}
          onChange={parseAvatar}
          accept="image/*"
          hidden
        />
        <CameraIcon
          color="white"
          position="absolute"
          top={"calc((100% - 10px)/2)"}
          left={"calc((100% - 20px)/2)"}
          fontSize="xl"
          zIndex={5}
        />
        <Box
          position="absolute"
          top="3px"
          left="3px"
          width="calc(100% - 6px)"
          height="calc(100% - 6px)"
          bg={me?.avatar ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.05)"}
        />
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
