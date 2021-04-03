/** @format */
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/common/navbar";
import NotFound from "./components/common/not-found.jsx";
import MovieForm from "./components/movieform";
import loginForm from "./components/loginForm";
import registerForm from "./components/registerForm";
import NewMovieForm from "./components/newMovieForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

console.log("SUPERMAN", process.env.REACT_APP_NAME);
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <ProtectedRoute path="/movies/new" exact component={NewMovieForm} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <ProtectedRoute path="/logout" exact component={Logout} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/login" component={loginForm}></Route>
          <Route path="/register" component={registerForm}></Route>
          <Route path="/customers" exact component={Customers} />
          <Route path="/rentals" exact component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
