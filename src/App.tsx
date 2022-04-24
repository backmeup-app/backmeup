import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Index } from "./pages";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
);
