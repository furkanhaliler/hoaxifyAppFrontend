import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";

const secureLs = new SecureLS();

const defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
};

const getStateFromStorage = () => {
  const hoaxAuth = secureLs.get("hoax-auth");

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  };

  if (hoaxAuth) {
    stateInLocalStorage = hoaxAuth;
  }
  return stateInLocalStorage;
};

const updateStateInStorage = (newState) => {
  secureLs.set("hoax-auth", newState);
};

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    authReducer,
    getStateFromStorage(),
    composeEnhancers(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    updateStateInStorage(store.getState());
  });

  return store;
};

export default configureStore;
