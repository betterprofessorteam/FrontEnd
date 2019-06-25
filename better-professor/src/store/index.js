import { createContext } from "react";

export const stateContext = createContext();

export const initialState = {
  registering: false,
  loggingIn: false,
  error: ""
};

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        error: "",
        registering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: "",
        registering: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
        registering: false
      };
    case LOGIN_START:
      return {
        ...state,
        error: "",
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: "",
        loggingIn: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loggingIn: false
      };
    default:
      return state;
  }
};

// export const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_START:
//       return {
//         ...state,
//         error: "",
//         loggingIn: true
//       };
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         error: "",
//         loggingIn: false
//       };
//     case LOGIN_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         loggingIn: false
//       };

//     default:
//       return state;
//   }
// };
