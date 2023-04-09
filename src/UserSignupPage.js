import React from "react";
import axios from "axios";

class UserSignUpPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onClickSignUp = (event) => {
    event.preventDefault();

    const { userName, displayName, password } = this.state;

    const body = {
      userName,
      displayName,
      password,
    };

    axios.post("/users/save", body);
  };

  render() {
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <div className="mb-3">
            <label>Username</label>
            <input
              className="form-control"
              name="userName"
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label>Display Name</label>
            <input
              className="form-control"
              name="displayName"
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              onChange={this.onChange}
            />
          </div>
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
            <button className="btn btn-primary" onClick={this.onClickSignUp}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignUpPage;
