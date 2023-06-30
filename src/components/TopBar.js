import React, { Component } from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { withTranslation } from "react-i18next";
// import { Authentication } from "../shared/AuthenticationContext";
import { connect } from "react-redux";
import { logoutSuccess } from "../redux/AuthActions";

class TopBar extends Component {
  // static contextType = Authentication;

  render() {
    const { t, isLoggedIn, username, onLogoutSuccess } = this.props;
    let links = (
      <ul className="navbar-nav">
        <li>
          <Link className="nav-link" to="/login">
            {t("Login")}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/signUp">
            {t("Sign Up")}
          </Link>
        </li>
      </ul>
    );
    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav">
          <li>
            <Link className="nav-link" to={`/user/${username}`}>
              {username}
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/" onClick={onLogoutSuccess}>
              {t("Logout")}
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="shadow-sm bg-light mb-3">
        <nav className="navbar bg-body-tertiary container navbar-expand">
          <div className="container-fluid">
            <Link className="navbar-brand" to={isLoggedIn ? "/home" : "/"}>
              <img src={logo} width="60" alt="Hoaxify Logo"></img>Hoaxify
            </Link>
            {links}
          </div>
        </nav>
      </div>
    );
  }
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutSuccess: () => {
      return dispatch(logoutSuccess());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarWithTranslation);
