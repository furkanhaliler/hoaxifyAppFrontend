import { createStore } from "redux";
import authReducer from "./AuthReducer";
const defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
};

const configureStore = () => {
  return createStore(authReducer, defaultState);
};

export default configureStore;
