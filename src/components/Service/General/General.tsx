import { useEffect, useContext, Dispatch } from "react";
import { Box, Flex, VStack, Text, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Form } from "../..";
import { useFormConfig, useGeneralControls } from "./controls";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { capitalize } from "../../../utilities";

export const General = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const defaultService = (me?.services as TService[]).find(
    (service) => service._id === (me?.default_service as string)
  ) as TService;
  const getFormConfig = useFormConfig();
  const getControls = useGeneralControls();
  const formik = useFormik(getFormConfig());
  const controls = getControls(formik);

  useEffect(() => {
    formik.setFieldValue("name", defaultService.name);
    formik.setFieldValue("description", defaultService.description);
  }, [defaultService._id]);

  return (
    <VStack spacing="24px" mx={10}>
      <Box w="100%" bgColor="white" boxShadow="md" p={10}>
        <Form
          controls={controls}
          onSubmit={formik.handleSubmit}
          networkOperation="update.service"
        />
      </Box>
      <Flex
        w="100%"
        bgColor="white"
        boxShadow="md"
        p={10}
        justify="space-between"
        align="center"
      >
        <Box w="60%" textAlign="left">
          <Text fontWeight="500" mb={1}>
            Delete {capitalize(defaultService.name)}
          </Text>
          <Text fontSize="15px">
            Doing this will delete all its associated resources along with their
            backups. Please be certain.
          </Text>
        </Box>
        <Button variant="danger">Delete</Button>
      </Flex>
    </VStack>
  );
};
