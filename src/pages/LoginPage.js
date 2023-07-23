import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { loginHandler } from "../redux/AuthActions";
import { connect } from "react-redux";

const LoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username: username,
      password,
    };
    setError(undefined);
    const { history, dispatch } = props;
    const { push } = history;
    try {
      await dispatch(loginHandler(creds));
      push("/home");
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const { t } = useTranslation();
  const { pendingApiCall } = props;
  const buttonDisabled = !username || !password;
  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t("Login")}</h1>
        <Input
          label={t("User Name")}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></Input>
        <Input
          label={t("Password")}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
        ></Input>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="text-center">
          <ButtonWithProgress
            onClick={onClickLogin}
            pendingApiCall={pendingApiCall}
            disabled={buttonDisabled || pendingApiCall}
            text={t("Login")}
          ></ButtonWithProgress>
        </div>
      </form>
    </div>
  );
};

export default connect()(withApiProgress(LoginPage, "/auth"));
