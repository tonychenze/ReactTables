import React, { Component } from "react";
import Movies from "./components/Movies";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Customer from "./components/customer";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Navigation />
        <Switch>
          <Route path="/new" component={MovieDetails} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/customers" component={Customer} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/movies/:id" component={MovieDetails} />
          <Route path="/movies" component={Movies} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
