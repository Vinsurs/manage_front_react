import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import LoginPage from "./pages/login";
import ManagePage from "./pages/manage";
import NotFound from "./components/notFound";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/manage" component={ManagePage} />
        <Route path="/login" component={LoginPage} />
        <Redirect from="/" exact to="/manage" />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
