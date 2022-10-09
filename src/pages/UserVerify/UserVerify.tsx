import { useEffect } from "react";
import { Loader } from "../../components";
import { useVerifyUser } from "../../store";

export const UserVerify = () => {
  const verifyUser = useVerifyUser();

  useEffect(() => {
    verifyUser();
  }, []);

  return <Loader />;
};
