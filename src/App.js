/** @format */
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/common/navbar";
import NotFound from "./components/common/not-found.jsx";
import MovieForm from "./components/movieform";
import loginForm from "./components/loginForm";
import registerForm from "./components/registerForm";
import NewMovieForm from "./components/newMovieForm";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar
          itemList={[
            "Vidly",
            "Movies",
            "Customers",
            "Rentals",
            "Login",
            "Register",
          ]}
        />
        <Switch>
          <Route path="/movies/new" exact component={NewMovieForm}></Route>
          <Route path="/movies/:id" component={MovieForm} />
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
