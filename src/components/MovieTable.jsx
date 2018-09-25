import React, { Component } from "react";
import Like from "./common/like";
import TableSortable from "./common/tableSortable";

import { Link } from "react-router-dom";

class MovieTable extends Component {
  movieHeaders = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "",
      content: movie => (
        <Like
          liked={movie.liked}
          onLike={() => this.props.onLikeClicked(movie)}
        />
      )
    },
    {
      key: "remove",
      label: "",
      content: movie => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onRemoveClicked(movie._id)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, onSort, currentSortColumn } = this.props;

    return (
      <TableSortable
        rows={movies}
        columns={this.movieHeaders}
        onSort={onSort}
        currentSortColumn={currentSortColumn}
      />
    );
  }
}

export default MovieTable;
