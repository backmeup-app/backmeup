import { Switch, Route } from "react-router-dom";
import { Flex, Image, Box } from "@chakra-ui/react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Footer } from "../";

export const Auth = () => {
  return (
    <Box overflowX="hidden" minH="100vh">
      <Flex
        w={{ base: "100vw", md: "102vw" }}
        direction={{ base: "column", md: "row" }}
        minH={{ base: "96.5vh", sm: "91vh" }}
        justify="center"
        align="center"
        bg="ivory"
        pos="relative"
        left={{ md: "-2vw" }}
      >
        <Image
          src="https://res.cloudinary.com/olamileke/image/upload/v1663418501/backmeup/assets/logos/logo_transparent_ligpzi.png"
          width={{ base: "14rem", sm: "17rem" }}
          height={{ base: "80px", sm: "100px" }}
          objectFit="cover"
          pos="relative"
          top={{ md: "-3vh" }}
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
