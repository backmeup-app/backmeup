import { useContext } from "react";
import { VStack, Box, Image } from "@chakra-ui/react";
import { useFormik } from "formik";
import { AppContext } from "../../../contexts";
import { Form } from "../..";
import {
  useProfileConfig,
  usePasswordConfig,
  useProfileControls,
  usePasswordControls,
} from "./controls";

export const Profile = () => {
  const [{ me }] = useContext(AppContext);
  const getProfileConfig = useProfileConfig();
  const getPasswordConfig = usePasswordConfig();
  const getProfileControls = useProfileControls();
  const getPasswordControls = usePasswordControls();
  const profileFormik = useFormik(getProfileConfig());
  const passwordFormik = useFormik(getPasswordConfig());
  const profileControls = getProfileControls(profileFormik);
  const passwordControls = getPasswordControls(passwordFormik);

  return (
    <VStack mx={10} pt={5} spacing={6} alignItems="flex-start">
      <Box w="100%">
        <Image
          src={me?.avatar}
          w={"120px"}
          h={"120px"}
          border="4px solid"
          borderColor="white"
          mb={5}
        />
        <Box w="100%" boxShadow="md" bgColor="white" p={10}>
          <Form
            controls={profileControls}
            onSubmit={profileFormik.handleSubmit}
            submitBtnText="Update"
            classNames={{ buttonParent: { colSpan: 6, mt: 8 } }}
          />
        </Box>
      </Box>
      <Box w="100%" boxShadow="md" bgColor="white" p={10}>
        <Form
          controls={passwordControls}
          onSubmit={passwordFormik.handleSubmit}
          submitBtnText="Update"
        />
      </Box>
    </VStack>
  );
};
