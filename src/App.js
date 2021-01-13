import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/styles.css";

import Home from "./Components/Home";
import Guess from "./Components/Guess/Guess";
import Multiple from "./Components/Multiple/Multiple";
import List from "./Components/List/List";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/multiple">
            <Multiple />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/guess">
            <Guess />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
