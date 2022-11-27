import { useContext, Dispatch } from "react";
import { VStack } from "@chakra-ui/react";
import { AppContext, TAppState } from "../../contexts";
import { TAppAction } from "../../store";
import { VerifyEmail } from "..";
import { General } from "./General";
import { Auth } from "./Auth";

export const Account = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  return (
    <>
      {me?.email_verification_token && <VerifyEmail />}
      <VStack spacing={6} mx={{ lg: 5 }} alignItems="flex-start">
        <General />
        <Auth />
      </VStack>
    </>
  );
};
