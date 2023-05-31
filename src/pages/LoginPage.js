import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import axios from "axios";
import ButtonWithProgress from "../components/ButtonWithProgress";

class LoginPage extends Component {
  state = {
    userName: null,
    password: null,
    error: null,
    pendingApiCall: false,
  };

  componentDidMount() {
    axios.interceptors.request.use((request) => {
      this.setState({ pendingApiCall: true });
      return request;
    });

    axios.interceptors.response.use(
      (response) => {
        this.setState({ pendingApiCall: false });
        return response;
      },
      (error) => {
        this.setState({ pendingApiCall: false });
        throw error;
      }
    );
  }

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
    try {
      await login(creds);
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const { t } = this.props;
    const { userName, password, error, pendingApiCall } = this.state;
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

export default withTranslation()(LoginPage);
