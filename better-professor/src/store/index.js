import { createContext } from "react";

export const stateContext = createContext();

export const initialState = {
  error: "",
  students: []
};

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const GET_STUDENTS_SUCCESS = "GET_STUDENTS_SUCCESS";
export const GET_STUDENTS_FAIL = "GET_STUDENTS_FAIL";

export const STUDENT_SEARCH_FAIL = "STUDENT_SEARCH_FAIL";

export const ADD_STUDENT_FAIL = "ADD_STUDENT_FAIL";

export const SEND_MESSAGE_FAIL = "SEND_MESSAGE_FAIL";

export const reducer = (state = initialState, action) => {
  console.log("REDUCER STATE", state);
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: ""
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
        error: ""
      };
    case GET_STUDENTS_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: ""
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case STUDENT_SEARCH_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case ADD_STUDENT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
