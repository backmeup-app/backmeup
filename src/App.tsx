import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Admin, Home } from "./components";
import { isAuthenticated } from "./utilities";
import { AppProvider } from "./contexts";

export const App = () => (
  <AppProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">{isAuthenticated() ? <Admin /> : <Home />}</Route>
        </Switch>
      </Router>
    </ChakraProvider>
  </AppProvider>
);
