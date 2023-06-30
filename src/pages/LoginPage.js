import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
// import { Authentication } from "../shared/AuthenticationContext";
import { loginSuccess } from "../redux/AuthActions";
import { connect } from "react-redux";

class LoginPage extends Component {
  // static contextType = Authentication;
  state = {
    userName: null,
    password: null,
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { userName, password } = this.state;
    const creds = {
      username: userName,
      password,
    };
    this.setState({ error: null });
    const { push } = this.props.history;
    try {
      const response = await login(creds);
      push("/home");

      const authState = {
        username: response.data.data.userName,
        displayName: response.data.data.displayName,
        password: password,
        image: undefined,
      };

      this.props.onLoginSuccess(authState);
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { userName, password, error } = this.state;
    const buttonDisabled = !userName || !password;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            label={t("User Name")}
            name="userName"
            onChange={this.onChange}
          ></Input>
          <Input
            label={t("Password")}
            name="password"
            onChange={this.onChange}
            type="password"
          ></Input>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="text-center">
            <ButtonWithProgress
              onClick={this.onClickLogin}
              pendingApiCall={pendingApiCall}
              disabled={buttonDisabled || pendingApiCall}
              text={t("Login")}
            ></ButtonWithProgress>
          </div>
        </form>
      </div>
    );
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: (authState) => {
      return dispatch(loginSuccess(authState));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withApiProgress(LoginPageWithTranslation, "/auth"));
