/**@format */

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import httpService from "../services/httpService";
import { usersAPI } from "../config.json";
import { toast } from "react-toastify";
import auth from "../services/authService";

class registerForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: { email: "", password: "" },
  };

  schema = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tilds: { allow: ["com", "net", "no"] },
      })
      .min(5)
      .required()
      .label("email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await httpService.post(usersAPI, this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error(errors.username);
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("email", "email", true)}
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
