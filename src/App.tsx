import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { Auth, Notification } from "./components";
import { Admin, UserVerify } from "./pages";
import { isAuthenticated } from "./utilities";
import { AppProvider } from "./contexts";

export const AuthGuardedRoute: FC<RouteProps> = ({ path, exact, children }) => {
  return isAuthenticated() ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/session/new" />
  );
};

export const GuestGuardedRoute: FC<RouteProps> = ({
  path,
  exact,
  children,
}) => {
  return !isAuthenticated() ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export const App = () => (
  <AppProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/verify/:token">
            <UserVerify />
          </Route>
          <Route path="/auth/change/:token">
            <Auth />
          </Route>
          <GuestGuardedRoute path="/password/reset/:token">
            <Auth />
          </GuestGuardedRoute>
          <Route path="/session">
            <Auth />
          </Route>
          <GuestGuardedRoute path="/accounts/new">
            <Auth />
          </GuestGuardedRoute>
          <AuthGuardedRoute path="/">
            <Admin />
          </AuthGuardedRoute>
        </Switch>
      </Router>
      <Notification />
    </ChakraProvider>
  </AppProvider>
);
