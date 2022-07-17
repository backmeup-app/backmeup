import axios from "axios";
import Cookies from "universal-cookie";

export const client = () => {
  const token = new Cookies().get("token");
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    Accepts: "application/json",
  };

  if (token) headers["Authorization"] = "Bearer " + token;
  return axios.create({
    baseURL: String(
      process.env.REACT_APP_BACKMEUP_API ??
        window.__env__.REACT_APP_BACKMEUP_API
    ),
    headers,
  });
};
