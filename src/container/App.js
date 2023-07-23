import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";
import HomePageLoggedIn from "../pages/HomePageLoggedIn";
import HomePageLoggedOut from "../pages/HomePageLoggedOut";
import UserPage from "../pages/UserPage";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
    };
  });

  return (
    <div>
      <Router>
        <TopBar></TopBar>
        <Switch>
          {!isLoggedIn && (
            <Route exact path="/" component={HomePageLoggedOut}></Route>
          )}
          {isLoggedIn && (
            <Route exact path="/home" component={HomePageLoggedIn}></Route>
          )}
          {!isLoggedIn && <Route path="/login" component={LoginPage}></Route>}
          {!isLoggedIn && (
            <Route path="/signup" component={UserSignupPage}></Route>
          )}
          {isLoggedIn && (
            <Route path="/user/:username" component={UserPage}></Route>
          )}
          <Redirect to={isLoggedIn ? "/home" : "/"}></Redirect>
        </Switch>
      </Router>
      <LanguageSelector></LanguageSelector>
    </div>
  );
};

export default App;
