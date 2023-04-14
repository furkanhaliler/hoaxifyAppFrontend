import React from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";

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
    this.setState({
      [name]: value,
      errors,
    });
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
    const { userName, displayName, password } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <Input
            label="Username"
            name="userName"
            error={userName}
            onChange={this.onChange}
          ></Input>
          <Input
            label="Display Name"
            name="displayName"
            error={displayName}
            onChange={this.onChange}
          ></Input>
          <Input
            label="Password"
            name="password"
            error={password}
            onChange={this.onChange}
            type="password"
          ></Input>

          <div className="mb-3">
            <label>Password Repeat</label>
            <input
              className="form-control"
              name="passwordRepeat"
              type="password"
              onChange={this.onChange}
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={this.onClickSignUp}
              disabled={pendingApiCall}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignUpPage;
