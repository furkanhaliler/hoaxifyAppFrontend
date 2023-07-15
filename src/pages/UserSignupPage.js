import React from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { signUpHandler } from "../redux/AuthActions";

class UserSignUpPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;

    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
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
    if (value === "" && (password === null || passwordRepeat === null)) {
      return undefined;
    }
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

    const { history, dispatch } = this.props;
    const { push } = history;

    const { userName, displayName, password } = this.state;

    const body = {
      userName,
      displayName,
      password,
    };

    try {
      await dispatch(signUpHandler(body));
      push("/home");
    } catch (error) {
      if (error.response.data) {
        this.setState({ errors: error.response.data.data });
      }
    }
  };

  render() {
    const { errors } = this.state;
    const { userName, displayName, password, passwordRepeat } = errors;
    const { t, pendingApiCall } = this.props;
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
            <ButtonWithProgress
              onClick={this.onClickSignUp}
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall || passwordRepeat}
              text={t("Sign Up")}
            ></ButtonWithProgress>
          </div>
        </form>
      </div>
    );
  }
}

const UserSignUpPageWithApiProgressForSignupRequest = withApiProgress(
  UserSignUpPage,
  "/users/save"
);

const UserSignUpPageWithApiProgressForAuthRequest = withApiProgress(
  UserSignUpPageWithApiProgressForSignupRequest,
  "/auth"
);

const UserSignUpPageWithTranslation = withTranslation()(
  UserSignUpPageWithApiProgressForAuthRequest
);

export default connect()(UserSignUpPageWithTranslation);
