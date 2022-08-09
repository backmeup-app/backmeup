import { useContext, useRef } from "react";
import { VStack, Box, Image, Flex, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useFormik } from "formik";
import { AppContext } from "../../../contexts";
import { Form, VerifyEmail } from "../..";
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

  const handleFileClick = () => {
    fileRef.current && fileRef.current.click();
  };

  return (
    <>
      {me?.email_verification_token && <VerifyEmail />}
      <VStack spacing={6} mx={{ lg: 5 }} alignItems="flex-start">
        <Box w="100%">
          <Flex mb={5} alignItems="flex-end">
            <Image
              src={me?.avatar}
              ref={imageRef}
              w={{ base: "90px", sm: "100px", md: "120px" }}
              h={{ base: "90px", sm: "100px", md: "120px" }}
              border="4px solid"
              borderColor="white"
              rounded={{ base: "full", md: "none" }}
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
          <Box
            w="100%"
            boxShadow="md"
            bgColor="white"
            p={{ base: 6, sm: 8, md: 10 }}
          >
            <Form
              controls={profileControls}
              onSubmit={profileFormik.handleSubmit}
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
        <Box
          w="100%"
          boxShadow="md"
          bgColor="white"
          p={{ base: 6, sm: 8, md: 10 }}
        >
          <Form
            controls={passwordControls}
            onSubmit={passwordFormik.handleSubmit}
            submitBtnText="Update"
            networkOperation="update.user.password"
          />
        </Box>
        <ResetEmail isOpen={isOpen} onClose={onClose} />
      </VStack>
    </>
  );
};
