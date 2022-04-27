import Cookies from "universal-cookie";

const cookie = new Cookies();

export const isAuthenticated = () => cookie.get("token");
