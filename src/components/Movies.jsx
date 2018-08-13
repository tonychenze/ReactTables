import React, { Component } from "react";

import { getMovies, deleteMovie } from "../services/fakeMovieService";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: getMovies()
    };
  }

  handleRemoveMovie = movieID => {
    deleteMovie(movieID);
    this.setState({
      movies: getMovies()
    });
  };

  getMoviesRows = () => {
    let { movies } = this.state;
    return (
      <tbody>
        {movies.map(movie => (
          <tr key={movie.title}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => this.handleRemoveMovie(movie._id)}
              >
                {" "}
                Delete{" "}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  getTableHeader = () => {
    const headers = ["Title", "Genre", "Stock", "Rate", " "];
    return (
      <thead className="thead-dark">
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  getEmptyList = () => {
    return <h3>No Items</h3>;
  };

  getNonEmptyTable = () => {
    return (
      <table className="table">
        {this.getTableHeader()}
        {this.getMoviesRows()}
      </table>
    );
  };

  getContents = () => {
    return this.state.movies.length === 0
      ? this.getEmptyList()
      : this.getNonEmptyTable();
  };

  render() {
    return <div>{this.getContents()}</div>;
  }
}
