/**@format */

import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class loginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: { username: "", password: "" },
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //Call server
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("username", "Username", true)}
            {this.renderInput("password", "Password", false, "password")}
          </div>
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default loginForm;
