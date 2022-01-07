import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CandidateForm from "./pages/CandidateForm";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/create" component={CandidateForm} />
        <Route exact path="/create/:id" component={CandidateForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
