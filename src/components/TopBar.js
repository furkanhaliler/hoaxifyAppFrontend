import React, { Component } from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { withTranslation } from "react-i18next";

class TopBar extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="shadow-sm bg-light mb-3">
        <nav className="navbar bg-body-tertiary container navbar-expand">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} width="60" alt="Hoaxify Logo"></img>Hoaxify
            </Link>
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
          </div>
        </nav>
      </div>
    );
  }
}

export default withTranslation()(TopBar);
