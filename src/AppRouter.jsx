import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/LogIn/Login";

const AppRouter = () => {
  return (
    <Router>
      <nav className="bg-blue-500 p-4">
        <ul>
          <li>
            <Link to="/">Registration</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
