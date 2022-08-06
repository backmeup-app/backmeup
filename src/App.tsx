import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Notification } from "./components";
import { Admin, Home, ResetEmail } from "./pages";
import { isAuthenticated } from "./utilities";
import { AppProvider } from "./contexts";

export const App = () => (
  <AppProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/email/:action/:token">
            <ResetEmail />
          </Route>
          <Route path="/">{isAuthenticated() ? <Admin /> : <Home />}</Route>
        </Switch>
      </Router>
      <Notification />
    </ChakraProvider>
  </AppProvider>
);
