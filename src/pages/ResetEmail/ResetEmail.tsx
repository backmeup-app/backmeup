import { useLocation } from "react-router-dom";
import { ChangeEmail, EmailChanged } from "../../components";

export const ResetEmail = () => {
  const location = useLocation();
  const isResetEmail = location.pathname.toLowerCase().includes("reset");

  if (isResetEmail) return <ChangeEmail />;

  return <EmailChanged />;
};
