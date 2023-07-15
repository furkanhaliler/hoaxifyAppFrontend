import * as ACTIONS from "./Constants";
import { login, signUp } from "../api/apiCalls";

export const logoutSuccess = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authState) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const loginHandler = (credentials) => {
  return async function (dispatch) {
    const response = await login(credentials);

    const authState = {
      username: response.data.data.userName,
      displayName: response.data.data.displayName,
      password: credentials.password,
      image: undefined,
    };

    dispatch(loginSuccess(authState));
    return response;
  };
};

export const signUpHandler = (user) => {
  return async function (dispatch) {
    const loginRequest = {
      username: user.userName,
      password: user.password,
    };
    const response = await signUp(user);
    await dispatch(loginHandler(loginRequest));
    return response;
  };
};
