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
import { Admin, ResetEmail } from "./pages";
import { isAuthenticated } from "./utilities";
import { AppProvider } from "./contexts";

const AuthGuardedRoute: FC<RouteProps> = ({ path, exact, children }) => {
  return isAuthenticated() ? (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  ) : (
    <Redirect to="/session/new" />
  );
};

const GuestGuardedRoute: FC<RouteProps> = ({ path, exact, children }) => {
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
          <Route path="/email/:action/:token">
            <ResetEmail />
          </Route>
          <GuestGuardedRoute path="/session">
            <Auth />
          </GuestGuardedRoute>
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
