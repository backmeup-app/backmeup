import { Switch, Route } from "react-router-dom";
import { Flex, Image, Box } from "@chakra-ui/react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Footer } from "../";

export const Auth = () => {
  return (
    <Box overflowX="hidden" minH="100vh">
      <Flex
        w="100vw"
        h="91vh"
        justify="center"
        align="center"
        bg="ivory"
        pos="relative"
      >
        <Image
          src="https://res.cloudinary.com/olamileke/image/upload/v1663418501/backmeup/assets/logos/logo_transparent_ligpzi.png"
          width="17rem"
          height="100px"
          objectFit="cover"
          pos="relative"
          top="-3vh"
        />
        <Switch>
          <Route path="/session/new">
            <Login />
          </Route>
          <Route path="/accounts/new">
            <Signup />
          </Route>
        </Switch>
      </Flex>
      <Footer />
    </Box>
  );
};
