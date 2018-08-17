import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import Like from "./like";
export default class Movies extends Component {
  constructor(props) {
    super(props);
    const likeMovies = getMovies().map(m => {
      m.like = false;
      return m;
    });
    this.state = {
      movies: likeMovies
    };
  }

  handleRemoveMovie = movieID => {
    const newList = this.state.movies.filter(movie => movie._id !== movieID);
    this.setState({
      movies: newList
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movie.like;
    this.setState({ movies });
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
              <Like item={movie} onLike={this.handleLike} />
            </td>
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
    const headers = ["Title", "Genre", "Stock", "Rate", "Like", " "];
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
