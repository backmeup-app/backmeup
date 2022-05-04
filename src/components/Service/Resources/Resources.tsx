import { useContext, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { ResourceMessage } from ".";
import { AppContext } from "../../../contexts";
import { TService } from "../../../store";

export const Resources = () => {
  const [{ me }] = useContext(AppContext);

  const defaultService = useMemo(() => {
    return me?.services?.find(
      (service) => service._id.toString() === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service, me?.services]);

  if (defaultService?.resources?.length === 0) return <ResourceMessage />;

  return <Box>Resources</Box>;
};
