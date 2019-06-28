import React from "react";
import { Route } from "react-router-dom";
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
import Inbox from "./components/Inbox";
import SendMessage from "./components/SendMessage";
import RegisterSuccess from "./components/RegisterSuccess";
import StudentProfile from "./components/StudentProfile";
import MyStudents from "./components/MyStudents";
import Account from "./components/Account";

const App = () => {
  return (
    <StateProvider reducer={reducer} stateContext={stateContext}>
      <div className="App">
        <Route exact path="/" component={Home} />
      </div>

      <Route
        path="/register"
        render={props => {
          return <Register {...props} />;
        }}
      />
      <Route
        path="/register-success"
        render={props => {
          return <RegisterSuccess {...props} />;
        }}
      />
      <Route
        path="/login"
        render={props => {
          return <Login {...props} />;
        }}
      />
      <Route
        path="/my-bp"
        render={props => {
          return <Dashboard {...props} />;
        }}
      />
      <Route
        exact
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
      <Route
        path="/my-bp/inbox"
        render={props => {
          return <Inbox {...props} />;
        }}
      />
      <Route
        path="/my-bp/send-message"
        render={props => {
          return <SendMessage {...props} />;
        }}
      />
      <Route
        path="/my-bp/students/:id"
        render={props => {
          return <StudentProfile {...props} />;
        }}
      />
      <Route
        path="/my-bp/my-students"
        render={props => {
          return <MyStudents {...props} />;
        }}
      />
      <Route
        path="/my-bp/account"
        render={props => {
          return <Account {...props} />;
        }}
      />
    </StateProvider>
  );
};

export default App;
