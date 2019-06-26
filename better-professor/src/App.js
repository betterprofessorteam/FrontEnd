import React from "react";
import { Route, Link } from "react-router-dom";
import { StateProvider } from "react-conflux";
import { reducer } from "./store/index";
import { stateContext } from "./store";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import MyCalendar from "./components/MyCalendar";
import Dashboard from "./components/Dashboard";
import Students from "./components/Students";

const App = () => {
  return (
    <StateProvider reducer={reducer} stateContext={stateContext}>
      <div className="App">
        <Route exact path="/" component={Home} />
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

      <Route
        path="/my-bp"
        render={props => {
          return <Dashboard {...props} />;
        }}
      />

      <Route
        path="/my-bp/students"
        render={props => {
          return <Students {...props} />;
        }}
      />

      <Route
        path="/my-bp/calendar"
        render={props => {
          return <MyCalendar {...props} />;
        }}
      />
    </StateProvider>
  );
};

export default App;
