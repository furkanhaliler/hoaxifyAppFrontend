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

class App extends React.Component {
  state = {
    isLoggedIn: false,
    username: undefined,
  };

  onLoginSuccess = (username) => {
    this.setState({
      username: username,
      isLoggedIn: true,
    });
  };

  onLogoutSuccess = () => {
    this.setState({
      isLoggedIn: false,
      username: undefined,
    });
  };

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <div>
        <Router>
          <TopBar
            isLoggedIn={isLoggedIn}
            username={username}
            onLogoutSuccess={this.onLogoutSuccess}
          ></TopBar>
          <Switch>
            {!isLoggedIn && (
              <Route exact path="/" component={HomePageLoggedOut}></Route>
            )}
            {isLoggedIn && (
              <Route exact path="/home" component={HomePageLoggedIn}></Route>
            )}
            {!isLoggedIn && (
              <Route
                path="/login"
                component={(props) => {
                  return (
                    <LoginPage
                      {...props}
                      onLoginSuccess={this.onLoginSuccess}
                    ></LoginPage>
                  );
                }}
              ></Route>
            )}
            {!isLoggedIn && (
              <Route path="/signup" component={UserSignupPage}></Route>
            )}
            {isLoggedIn && (
              <Route
                path="/user/:username"
                component={(props) => {
                  return <UserPage {...props} username={username}></UserPage>;
                }}
              ></Route>
            )}
            <Redirect to={isLoggedIn ? "/home" : "/"}></Redirect>
          </Switch>
        </Router>
        <LanguageSelector></LanguageSelector>
      </div>
    );
  }
}

export default App;
