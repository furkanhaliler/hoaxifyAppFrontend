import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class LoginPage extends Component {
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
    const { onLoginSuccess } = this.props;
    const creds = {
      username: userName,
      password,
    };
    this.setState({ error: null });
    const { push } = this.props.history;
    try {
      await login(creds);
      push("/home");
      onLoginSuccess(userName);
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

export default withApiProgress(LoginPageWithTranslation, "/auth");
