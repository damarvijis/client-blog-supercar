import {
  SET_ISLOGIN,
  SET_ISERROR,
  SET_ISLOADING,
  SET_REGISTER,
  SET_DATA_USER
} from "../actionTypes";
const server = "http://localhost:3005"
import axios from "axios"

export function setIsLogin(payload) {
  return {
    type: SET_ISLOGIN,
    payload,
  };
}

export function setDataUser(payload) {
  return {
    type: SET_DATA_USER,
    payload,
  };
}

export function setIsRegister(payload) {
  return {
    type: SET_REGISTER,
    payload,
  };
}

export function setIsLoading(payload) {
  return {
    type: SET_ISLOADING,
    payload,
  };
}

export function setIsError(payload) {
  return {
    type: SET_ISERROR,
    payload,
  };
}

export function logIn(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: `${server}/users/login`,
        method: "POST",
        data: data,
      })
        .then(({ data }) => {
          dispatch(setIsLogin(true))
          dispatch(setDataUser(data))
          localStorage.setItem("access_token", data.access_token)
          resolve()
        })
        .catch((err) => {
          console.log(err.response.data)
          dispatch(setIsError(err));
          reject(err.response.data)
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    })
  }
}

export function register(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios({
        url: `${server}/users/register`,
        method: "POST",
        data: data,
      })
        .then((data) => {
          dispatch(setIsRegister(data))
          resolve()
        })
        .catch((err) => {
          console.log(err)
          dispatch(setIsError(err));
          reject(err.response.data)
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    });
  }
}