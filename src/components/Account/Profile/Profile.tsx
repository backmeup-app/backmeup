import { useContext, useRef, useEffect } from "react";
import { VStack, Box, Image, Flex, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useFormik } from "formik";
import { AppContext } from "../../../contexts";
import { Form } from "../..";
import { ResetEmail } from "./ResetEmail";
import {
  useProfileConfig,
  usePasswordConfig,
  useProfileControls,
  usePasswordControls,
  useHandleFileChange,
} from "./controls";

export const Profile = () => {
  const [{ me }] = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const handleFileChange = useHandleFileChange();

  const getProfileConfig = useProfileConfig();
  const getProfileControls = useProfileControls();
  const profileFormik = useFormik(getProfileConfig());
  const profileControls = getProfileControls(profileFormik, onOpen);

  const getPasswordConfig = usePasswordConfig();
  const getPasswordControls = usePasswordControls();
  const passwordFormik = useFormik(getPasswordConfig());
  const passwordControls = getPasswordControls(passwordFormik);

  useEffect(() => {}, [fileRef.current]);

  const handleFileClick = () => {
    fileRef.current && fileRef.current.click();
  };

  return (
    <VStack mx={10} spacing={6} alignItems="flex-start">
      <Box w="100%">
        <Flex mb={5} alignItems="flex-end">
          <Image
            src={me?.avatar}
            ref={imageRef}
            w={"120px"}
            h={"120px"}
            border="4px solid"
            borderColor="white"
            mr={4}
          />
          <Text
            onClick={handleFileClick}
            as="u"
            fontSize="sm"
            cursor="pointer"
            color="gray.700"
          >
            Change Avatar
          </Text>
          <input
            type="file"
            ref={fileRef}
            onChange={(event) =>
              handleFileChange(profileFormik, event, imageRef)
            }
            accept="image/*"
            hidden
          />
        </Flex>
        <Box w="100%" boxShadow="md" bgColor="white" p={10}>
          <Form
            controls={profileControls}
            onSubmit={profileFormik.handleSubmit}
            submitBtnText="Update"
            classNames={{ buttonParent: { colSpan: 6, mt: 8 } }}
            networkOperation="update.user"
          />
        </Box>
      </Box>
      <Box w="100%" boxShadow="md" bgColor="white" p={10}>
        <Form
          controls={passwordControls}
          onSubmit={passwordFormik.handleSubmit}
          submitBtnText="Update"
          networkOperation="update.user.password"
        />
      </Box>
      <ResetEmail isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
