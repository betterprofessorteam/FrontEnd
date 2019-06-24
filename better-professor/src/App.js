import React from "react";
import { StateProvider } from "react-conflux";
import { loginReducer } from "./store/reducers";
import { stateContext } from "./store/contexts";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <StateProvider reducer={loginReducer} stateContext={stateContext}>
      <div className="App">
        <h1>Better Professor App</h1>
        <Login />
        <Register />
      </div>
    </StateProvider>
  );
};

export default App;
