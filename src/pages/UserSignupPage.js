import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { signUpHandler } from "../redux/AuthActions";

const UserSignUpPage = (props) => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;

    const newErrors = { ...errors };
    newErrors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
      newErrors.passwordRepeat = checkPasswordsMatch(name, value);
    }

    setErrors(newErrors);
    const formCopy = { ...form };
    formCopy[name] = value;
    setForm(formCopy);
  };

  const { t } = useTranslation();

  const checkPasswordsMatch = (name, value) => {
    if (
      value === "" &&
      (form.password === null || form.passwordRepeat === null)
    ) {
      return undefined;
    }
    if (
      (name === "password" && value !== form.passwordRepeat) ||
      (name === "passwordRepeat" && value !== form.password)
    ) {
      return t("Passwords do not match with each other.");
    }
    return undefined;
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();

    const { history } = props;
    const { push } = history;

    const { username, displayName, password } = form;

    const body = {
      username,
      displayName,
      password,
    };

    try {
      await dispatch(signUpHandler(body));
      push("/home");
    } catch (error) {
      if (error.response.data) {
        setErrors(error.response.data.data);
      }
    }
  };

  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError,
    passwordRepeat: passwordRepeatError,
  } = errors;
  const { pendingApiCall } = props;
  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t("Sign Up")}</h1>
        <Input
          label={t("User Name")}
          name="username"
          error={usernameError}
          onChange={onChange}
        ></Input>
        <Input
          label={t("Display Name")}
          name="displayName"
          error={displayNameError}
          onChange={onChange}
        ></Input>
        <Input
          label={t("Password")}
          name="password"
          error={passwordError}
          onChange={onChange}
          type="password"
        ></Input>
        <Input
          label={t("Password Repeat")}
          name="passwordRepeat"
          error={passwordRepeatError}
          onChange={onChange}
          type="password"
        ></Input>
        <div className="text-center">
          <ButtonWithProgress
            onClick={onClickSignUp}
            pendingApiCall={pendingApiCall}
            disabled={pendingApiCall || passwordRepeatError}
            text={t("Sign Up")}
          ></ButtonWithProgress>
        </div>
      </form>
    </div>
  );
};

const UserSignUpPageWithApiProgressForSignupRequest = withApiProgress(
  UserSignUpPage,
  "/users/save"
);

const UserSignUpPageWithApiProgressForAuthRequest = withApiProgress(
  UserSignUpPageWithApiProgressForSignupRequest,
  "/auth"
);

export default UserSignUpPageWithApiProgressForAuthRequest;
