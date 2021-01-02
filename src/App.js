/** @format */
import React, { Component } from "react";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/navbar";
import NotFound from "./components/common/not-found.jsx";
import MovieForm from "./components/movieform";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar itemList={["Vidly", "Movies", "Customers", "Rentals"]} />
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" exact component={Movies} />
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
