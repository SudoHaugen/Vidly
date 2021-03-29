/**@format */

import React from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import Joi from "joi-browser";
import Form from "./common/form";
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
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
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
    if (auth.getCurrentUser()) return <Redirect to="" />;
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
