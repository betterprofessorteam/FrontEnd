import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  HANDLE_CHANGE
} from "../constants";

const initialState = {
  loggingIn: false,
  error: ""
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
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
