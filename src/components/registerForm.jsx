/**@format */

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class registerForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: { username: "", password: "" },
  };

  schema = {
    username: Joi.string()
      .email({
        minDomainSegments: 2,
        tilds: { allow: ["com", "net", "no"] },
      })
      .min(5)
      .required()
      .label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    //Call server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("username", "Username", true)}
            {this.renderInput("password", "Password", false, "password")}
            {this.renderInput("name", "Name")}
          </div>
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default registerForm;
