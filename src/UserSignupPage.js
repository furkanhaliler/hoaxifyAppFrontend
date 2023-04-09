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
      <form>
        <h1>Sign Up</h1>
        <div>
          <label>Username</label>
          <input name="userName" onChange={this.onChange} />
        </div>
        <div>
          <label>Display Name</label>
          <input name="displayName" onChange={this.onChange} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" onChange={this.onChange} />
        </div>
        <div>
          <label>Password Repeat</label>
          <input
            name="passwordRepeat"
            type="password"
            onChange={this.onChange}
          />
        </div>
        <button onClick={this.onClickSignUp}>Sign Up</button>
      </form>
    );
  }
}

export default UserSignUpPage;
