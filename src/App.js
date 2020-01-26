import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Stat from "../src/component/stat/Stat";
import Verification from "./verification";
import StatState from '../src/component/context/card/StatState';

function App() {
  return (
    <>
     
      <Router>
      <StatState>
        <Switch>
          <Route exact path="/">
            <Verification />
          </Route>
          <Route exact path="/verify" component={Verification}></Route>
          <Route exact path="/stats" component={Stat}></Route>
         
        </Switch>
        </StatState>
      </Router>
    </>
  );
}

export default App;
