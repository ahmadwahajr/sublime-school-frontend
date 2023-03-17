import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL
} from "../constants/user-constants.js";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_REQUEST:
      return { ...state, loading: true };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {
          ...state.userInfo,
          data: { ...state.userInfo.data, user: action.payload }
        }
      };
    case GET_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userGetReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
