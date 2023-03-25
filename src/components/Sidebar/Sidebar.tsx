import { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useDisplayTabs } from "./tabs";
import { TSidebar } from "./types";

export const Sidebar: FC<TSidebar> = ({ onNavigate }) => {
  const displayTabs = useDisplayTabs();

  return (
    <Box
      w="100%"
      pos="relative"
      minH="100vh"
      bg="charlestonGreen"
      color="white"
      pt="60%"
    >
      {displayTabs(onNavigate)}
      <Text
        pos="absolute"
        color="white"
        fontFamily="oswald"
        left={5}
        bottom={8}
        fontSize="sm"
      >
        DOME
      </Text>
    </Box>
  );
};
