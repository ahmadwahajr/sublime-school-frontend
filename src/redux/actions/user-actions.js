import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL
} from "../constants/user-constants.js";

import { success, error } from "../../utils/toastr";
import { post } from "../../utils/apiCalls.js";
import store from "../../store.js";
import axios from "axios";
export const login =
  ({ username, password }) =>
  async dispatch => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST
      });

      const { data } = await post(`http://localhost:8000/api/v1/users/login`, {
        username,
        password
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
    } catch (er) {
      error(er?.response?.data?.message);

      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          er?.response && er?.response?.data?.message
            ? er?.response?.data?.message
            : er?.message
      });
    }
  };

export const logoutApi = _id => async dispatch => {
  try {
    dispatch({
      type: USER_LOGOUT_REQUEST
    });
    const token = store?.getState()?.loggedInUser?.userInfo?.token;

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    };
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/users/logout`,
      { _id },
      config
    );

    dispatch({
      type: USER_LOGOUT_SUCCESS
    });
  } catch (er) {
    error(er.response.data.message);

    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getUser = _id => async dispatch => {
  console.log("in get User");
  const token = store?.getState()?.loggedInUser?.userInfo?.token;
  dispatch({
    type: GET_USER_REQUEST
  });

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users/${_id}`,
      config
    );
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data.data
    });
  } catch (er) {
    console.log(er);
    error(er.response.data.message);

    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
