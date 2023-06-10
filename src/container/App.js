import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import TopBar from "../components/TopBar";

function App() {
  return (
    <div>
      <Router>
        <TopBar></TopBar>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/signup" component={UserSignupPage}></Route>
          <Route path="/user/:username" component={UserPage}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
      <LanguageSelector></LanguageSelector>
    </div>
  );
}

export default App;
