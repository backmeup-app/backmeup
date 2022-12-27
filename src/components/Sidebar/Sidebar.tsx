import { Box } from "@chakra-ui/react";
import { useDisplayTabs } from "./tabs";

export const Sidebar = () => {
  const displayTabs = useDisplayTabs();

  return (
    <Box
      w="100%"
      pos="relative"
      minH="100vh"
      bg="charlestonGreen"
      color="white"
      pt="55%"
    >
      {displayTabs()}
    </Box>
  );
};
