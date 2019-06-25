import React from "react";
import { Route, Link } from "react-router-dom";
import { StateProvider } from "react-conflux";
import { reducer } from "./store/index";
import { stateContext } from "./store";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  return (
    <StateProvider reducer={reducer} stateContext={stateContext}>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <Route
        path="/login"
        render={props => {
          return <Login {...props} />;
        }}
      />

      <Route
        path="/register"
        render={props => {
          return <Register {...props} />;
        }}
      />
    </StateProvider>
  );
};

export default App;
