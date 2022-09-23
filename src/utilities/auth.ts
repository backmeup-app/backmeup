import Cookies from "universal-cookie";

const cookie = new Cookies();

export const isAuthenticated = () => Boolean(cookie.get("token"));
