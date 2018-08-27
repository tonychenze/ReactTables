import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class MovieTable extends Component {
  movieHeaders = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like", label: "" },
    { key: "remove", label: "" }
  ];

  render() {
    const {
      movies,
      onLikeClicked,
      onRemoveClicked,
      onSort,
      currentSortColumn
    } = this.props;

    return (
      <table className="table">
        <TableHeader
          headers={this.movieHeaders}
          currentSortHeader={currentSortColumn}
          onSort={onSort}
        />
        <tbody>
          {movies.map(movie => (
            <tr key={movie.title}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onLike={() => onLikeClicked(movie)} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemoveClicked(movie._id)}
                >
                  {" "}
                  Delete{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MovieTable;
