import { FC, useContext, useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TSidebar } from "./types";
import { useDisplayTabs } from "./tabs";

export const Sidebar: FC<TSidebar> = ({ toggle }) => {
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
      <Text pos="absolute" fontFamily="oswald" left={5} bottom={10}>
        DOME
      </Text>
    </Box>
  );
};
