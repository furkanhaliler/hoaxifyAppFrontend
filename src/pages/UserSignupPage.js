import React from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
class UserSignUpPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;

    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === "password" || "passwordRepeat") {
      errors.passwordRepeat = this.checkPasswordsMatch(name, value);
    }

    this.setState({
      [name]: value,
      errors,
    });
  };

  checkPasswordsMatch = (name, value) => {
    const { password, passwordRepeat } = this.state;
    const { t } = this.props;
    if (
      (name === "password" && value !== passwordRepeat) ||
      (name === "passwordRepeat" && value !== password)
    ) {
      return t("Passwords do not match with each other.");
    }
    return undefined;
  };

  onClickSignUp = async (event) => {
    event.preventDefault();

    const { userName, displayName, password } = this.state;

    const body = {
      userName,
      displayName,
      password,
    };

    this.setState({ pendingApiCall: true });

    try {
      const response = await signUp(body);
    } catch (error) {
      if (error.response.data) {
        this.setState({ errors: error.response.data.data });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { userName, displayName, password, passwordRepeat } = errors;
    const { t } = this.props;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            label={t("User Name")}
            name="userName"
            error={userName}
            onChange={this.onChange}
          ></Input>
          <Input
            label={t("Display Name")}
            name="displayName"
            error={displayName}
            onChange={this.onChange}
          ></Input>
          <Input
            label={t("Password")}
            name="password"
            error={password}
            onChange={this.onChange}
            type="password"
          ></Input>
          <Input
            label={t("Password Repeat")}
            name="passwordRepeat"
            error={passwordRepeat}
            onChange={this.onChange}
            type="password"
          ></Input>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={this.onClickSignUp}
              disabled={pendingApiCall || passwordRepeat}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {t("Sign Up")}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(UserSignUpPage);
