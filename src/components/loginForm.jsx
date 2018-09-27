import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = { account: { username: "", password: "" } };
  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={account.username}
            label="Username"
            name="username"
            type="text"
            onChange={this.handleChange}
          />
          <Input
            value={account.password}
            label="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Submit </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
