/**@format */

import React, { Component } from "react";

class loginForm extends Component {
  userName = React.createRef();

  componentDidMount() {
    this.userName.current.focus();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //Call server
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              ref={this.userName}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default loginForm;
