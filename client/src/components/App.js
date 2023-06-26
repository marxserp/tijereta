import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ReservationForm from "../pages/ReservationForm";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/reserva">
            <ReservationForm />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
