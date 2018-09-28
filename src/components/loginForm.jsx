import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    console.log(result);
    const errors = {};
    const { account } = this.state;
    if (account.password.trim() === "") {
      errors.password = "Passowrd is required";
    }
    if (account.username.trim() === "") {
      errors.username = "Username is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    //calling the server
    console.log("submitted");
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username can't be empty";
      //..
    }
    if (name === "password") {
      if (value.trim() === "") return "Password can't be empty";
      //...
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
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
            error={errors.username}
          />
          <Input
            value={account.password}
            label="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Submit </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
