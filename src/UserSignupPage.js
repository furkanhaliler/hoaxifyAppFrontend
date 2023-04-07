import React from "react";

class UserSignUpPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  };

  onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form>
        <h1>Sign Up</h1>
        <div>
          <label>Username</label>
          <input name="username" onChange={this.onChange} />
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
        <button>Sign Up</button>
      </form>
    );
  }
}

export default UserSignUpPage;
