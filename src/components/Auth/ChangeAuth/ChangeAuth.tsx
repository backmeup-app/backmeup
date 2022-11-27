import { useEffect } from "react";
import { Loader } from "../..";
import { useChangeAuthEmail } from "../../../store";

export const ChangeAuth = () => {
  const changeAuthEmail = useChangeAuthEmail();

  useEffect(() => {
    changeAuthEmail();
  }, []);

  return <Loader />;
};
