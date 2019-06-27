import { createContext } from "react";

export const stateContext = createContext();

export const initialState = {
  userType: "",
  error: "",
  students: []
};

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const SET_USER_TYPE = "SET_USER_TYPE";

export const STUDENT_SEARCH_FAIL = "STUDENT_SEARCH_FAIL";

export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const ADD_STUDENT_FAIL = "ADD_STUDENT_FAIL";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case SET_USER_TYPE:
      return {
        ...state,
        error: "",
        userType: action.payload
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
    case STUDENT_SEARCH_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        error: "",
        students: action.payload
      };
    case ADD_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
