import { Switch, Route } from "react-router-dom";
import { Flex, Image } from "@chakra-ui/react";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const Auth = () => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      bg="#fdf4ee"
      pos="relative"
    >
      <Image
        src="https://res.cloudinary.com/olamileke/image/upload/v1663418501/backmeup/assets/logos/logo_transparent_ligpzi.png"
        width="40"
        height="50px"
        objectFit="cover"
        pos="absolute"
        top={10}
        left={10}
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
  );
};
