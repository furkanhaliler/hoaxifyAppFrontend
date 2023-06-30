import React from "react";
import ApiProgress from "../shared/ApiProgress";
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
// import { Authentication } from "../shared/AuthenticationContext";
import { connect } from "react-redux";

class App extends React.Component {
  // static contextType = Authentication;
  render() {
    const { isLoggedIn } = this.props;

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
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
