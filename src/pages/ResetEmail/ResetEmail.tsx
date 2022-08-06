import { useEffect, useContext, Dispatch } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Flex, Spinner } from "@chakra-ui/react";
import { ChangeEmail, EmailChanged } from "../../components";
import { TAppAction, useVerifyEmail } from "../../store";
import { AppContext, TAppState } from "../../contexts";

export const ResetEmail = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const { action } = useParams<{ action: string }>();
  const verifyEmail = useVerifyEmail();

  useEffect(() => {
    action.toLowerCase() === "verify" && verifyEmail();
  }, []);

  switch (action.toLowerCase()) {
    case "reset":
      return <ChangeEmail />;
    case "change":
      return <EmailChanged />;
    case "verify":
      return (
        <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
          <Helmet>
            <title>Verify {me?.email ?? "Your Email Address"} | Backmeup</title>
          </Helmet>
          <Spinner size="lg" />
        </Flex>
      );
    default:
      return <Flex />;
  }
};
