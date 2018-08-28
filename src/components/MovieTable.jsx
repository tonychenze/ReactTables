import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MovieTable extends Component {
  movieHeaders = [
    { path: "title", label: "Title" },
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
      <table className="table">
        <TableHeader
          headers={this.movieHeaders}
          currentSortHeader={currentSortColumn}
          onSort={onSort}
        />
        <TableBody rows={movies} columns={this.movieHeaders} />
      </table>
    );
  }
}

export default MovieTable;
