import React, { Component } from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { withTranslation } from "react-i18next";
// import { Authentication } from "../shared/AuthenticationContext";

class TopBar extends Component {
  // static contextType = Authentication;
  render() {
    const { t } = this.props;

    const onLogoutSuccess = () => {};
    const username = undefined;
    const isLoggedIn = false;
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

export default withTranslation()(TopBar);
