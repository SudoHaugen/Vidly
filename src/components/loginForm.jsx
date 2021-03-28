/**@format */

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import auth from "../services/authService";

class loginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: { email: "", password: "" },
  };

  schema = {
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const {
        data: { email, password },
      } = this.state;
      await auth.login(email, password);
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("email", "email", true)}
            {this.renderInput("password", "Password", false, "password")}
          </div>
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default loginForm;
