/**@format */

import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class loginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: { username: "", password: "" },
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false }; //Set options for Joi validation
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const property = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(property, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    //Call server
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const account = { ...this.state.account };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Input
              name="username"
              value={account.username}
              label="Username"
              onChange={this.handleChange}
              autofocus={true}
              error={errors.username}
            />
          </div>
          <div className="form-group">
            <Input
              name="password"
              value={account.password}
              label="Password"
              onChange={this.handleChange}
              autofocus={false}
              error={errors.password}
            />
          </div>
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default loginForm;
