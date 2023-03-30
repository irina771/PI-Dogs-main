import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {CreateDog, DetailPage, HomePage, LandingPage} from "./views/index";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <LandingPage />
      </Route>
      
      <Route exact path="/home">
        <HomePage />
      </Route>

      <Route exact path="/dogs/:id">
        <DetailPage />
      </Route>

      <Route exact path="/createDog">
        <CreateDog />
      </Route>

      
    </Router>
  );
}

export default App;
