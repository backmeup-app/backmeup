import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Flex, Image, Box } from "@chakra-ui/react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Footer, Loader } from "../";
import { useVerifyGoogleAuth } from "../../store";
import { ResetPassword } from "./ResetPassword";

export const Auth = () => {
  const verifyGoogleAuth = useVerifyGoogleAuth();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) verifyGoogleAuth(code);
  }, []);

  const redirectGoogleAuth = () => {
    const apiUrl = String(
      process.env.REACT_APP_BACKMEUP_API ??
        window.__env__.REACT_APP_BACKMEUP_API
    );
    const googleAuthUrl = apiUrl + "/accounts/google";
    window.location.href = googleAuthUrl;
  };

  if (code) return <Loader />;

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
          <Route path="/password/reset/:token">
            <ResetPassword />
          </Route>
          <Route path="/session/new">
            <Login handleGoogleSignin={redirectGoogleAuth} />
          </Route>
          <Route path="/accounts/new">
            <Signup handleGoogleSignin={redirectGoogleAuth} />
          </Route>
        </Switch>
      </Flex>
      <Footer />
    </Box>
  );
};
